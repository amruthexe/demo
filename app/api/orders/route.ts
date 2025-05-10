import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Razorpay from "razorpay";
import Order from "@/models/Order";
import { connectToDatabase } from "@/lib/db";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // Delay in milliseconds (2 seconds)

async function connectWithRetry(retries: number = 0) {
  try {
    await connectToDatabase();
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.log(`Retrying connection... attempt ${retries + 1}`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      await connectWithRetry(retries + 1);
    } else {
      throw new Error("Failed to connect to the database after several attempts.");
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    const body = await req.json();
    const { items, shippingAddress } = body;

    if (!items || !Array.isArray(items) || items.length === 0 || !shippingAddress) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

    await connectWithRetry(); // Retry connection if needed

    // Calculate total amount for all items
    const totalAmount = items.reduce((sum, item) => {
      return sum + (item.variant.price * item.quantity);
    }, 0);

    const amountInPaise = Math.round(totalAmount * 100);

    // Create order in Razorpay
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        items: JSON.stringify(items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          variant: item.variant.type
        }))),
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }).catch((err) => {
      console.error("Error while creating Razorpay order:", err);
      throw new Error("Failed to create Razorpay order");
    });

    // Create orders in MongoDB for each item
    const orderPromises = items.map(item => 
      Order.create({
        userId: session.user.id,
        productId: item.productId,
        variant: item.variant,
        quantity: item.quantity,
        razorpayOrderId: razorpayOrder.id,
        amount: item.variant.price * item.quantity,
        status: "pending",
        shippingAddress,
      })
    );

    const orders = await Promise.all(orderPromises);

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: razorpayOrder.currency,
      dbOrderIds: orders.map(order => order._id),
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}