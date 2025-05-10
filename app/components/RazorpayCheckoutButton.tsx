"use client";

import { useSession } from "next-auth/react";
import Script from "next/script";

export default function RazorpayCheckoutButton({ productId, variant, quantity = 1, shippingAddress }: any) {
  const { data: session } = useSession();

  const loadRazorpay = async () => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, variant, quantity, shippingAddress }),
    });

    const data = await res.json();
    if (!res.ok) {
      return alert("Failed to create Razorpay order");
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Your App Name",
      description: "Purchase Image",
      order_id: data.orderId,
      handler: function (response: any) {
        alert("Payment successful! Razorpay Payment ID: " + response.razorpay_payment_id);
        // Here, you should send response.razorpay_payment_id to your backend to verify and update the order status
      },
      prefill: {
        name: session?.user?.name || "",
        email: session?.user?.email || "",
      },
      notes: {
        dbOrderId: data.dbOrderId,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button onClick={loadRazorpay} className="btn btn-primary">
        Pay with Razorpay
      </button>
    </>
  );
}
