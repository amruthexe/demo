"use client";

import { useCart } from "@/app/components/CartContext";
import { IKImage } from "imagekitio-next";
import { IMAGE_VARIANTS } from "@/models/Product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import CheckoutForm from "@/app/components/CheckoutForm";
import { useNotification } from "@/app/components/Notification";
import { apiClient } from "@/lib/api-client";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);
  const { showNotification } = useNotification();

  const handleCheckout = () => {
    if (!session) {
      router.push("/register");
      return;
    }
    setShowCheckout(true);
  };

  const handlePurchase = async (shippingAddress: any) => {
    if (!session) {
      showNotification("Please login to make a purchase", "error");
      router.push("/register");
      return;
    }

    try {
      // Prepare items for the API
      const orderItems = items.map(item => ({
        productId: item.product._id,
        variant: item.variant,
        quantity: item.quantity
      }));

      // Create a single order for all items
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: orderItems,
          shippingAddress
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const { orderId, dbOrderIds } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(totalAmount * 100), // Convert to paise and ensure it's a whole number
        currency: "INR",
        name: "vevvion Shop",
        description: `Purchase of ${items.length} items`,
        order_id: orderId,
        handler: function () {
          showNotification("Payment successful!", "success");
          clearCart(); // Clear the cart after successful payment
          router.push(`/order/success?orderId=${dbOrderIds[0]}`);
        },
        prefill: {
          email: shippingAddress.email,
          contact: shippingAddress.phone,
          name: shippingAddress.fullName,
        },
        notes: {
          orderIds: dbOrderIds.join(','), // Store all order IDs
          totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
          totalAmount: totalAmount
        },
        theme: {
          color: "#16a34a",
        },
      };

      if (!(window as any).Razorpay) {
        console.error("Razorpay script not loaded");
        showNotification("Razorpay script not loaded", "error");
        return;
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in handlePurchase:", error);
      showNotification(
        error instanceof Error ? error.message : "Payment failed",
        "error"
      );
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-base-content/70 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const variantDimensions =
              IMAGE_VARIANTS[
                item.variant.type.toUpperCase() as keyof typeof IMAGE_VARIANTS
              ].dimensions;

            return (
              <div
                key={`${item.product._id}-${item.variant.type}`}
                className="card bg-base-100 shadow-lg"
              >
                <div className="card-body p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div
                      className="relative rounded-lg overflow-hidden bg-base-200 w-full sm:w-48"
                      style={{
                        aspectRatio: `${variantDimensions.width} / ${variantDimensions.height}`,
                      }}
                    >
                      <IKImage
                        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                        path={item.product.imageUrl}
                        alt={item.product.name}
                        transformation={[
                          {
                            quality: "60",
                            width: variantDimensions.width.toString(),
                            height: variantDimensions.height.toString(),
                            cropMode: "extract",
                            focus: "center",
                          },
                        ]}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {item.product.name}
                      </h3>
                      <p className="text-base-content/70 mb-4">
                        {item.product.description}
                      </p>
                     

                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() =>
                              updateQuantity(
                                item.product._id!.toString(),
                                item.quantity - 1
                              )
                            }
                          >
                            −
                          </button>
                          <span className="text-xl font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() =>
                              updateQuantity(
                                item.product._id!.toString(),
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold">
                            ₹{(item.variant.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            className="btn btn-ghost btn-sm text-error"
                            onClick={() =>
                              removeFromCart(item.product._id!.toString())
                            }
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <button
                className="btn btn-primary btn-lg w-full"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutForm
          totalAmount={totalAmount}
          onSubmit={handlePurchase}
          onCancel={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
} 