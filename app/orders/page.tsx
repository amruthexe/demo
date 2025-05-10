"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IOrder } from "@/models/Order";
import { Loader2 } from "lucide-react";
import { IKImage } from "imagekitio-next";
import { IMAGE_VARIANTS } from "@/models/Product";
import { apiClient } from "@/lib/api-client";

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiClient.getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchOrders();
    else setLoading(false); // Stop loading if not logged in
  }, [session]);

  if (loading) {
    // Check if the user is logged in and show appropriate message
    if (!session) {
      return (
        <div className="min-h-[70vh] flex justify-center items-center">
          <div className="text-lg text-base-content/70">Please log in to see your orders</div>
        </div>
      );
    }
    // Show the loader while fetching orders
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>
      <div className="space-y-6">
        {/* If no orders exist, show "No orders found" */}
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-base-content/70 text-lg">No orders found</div>
          </div>
        ) : (
          orders.map((order) => {
            const variantDimensions =
              IMAGE_VARIANTS[
                order.variant.type.toUpperCase() as keyof typeof IMAGE_VARIANTS
              ].dimensions;

            const product = order.productId as any;

            return (
              <div
                key={order._id?.toString()}
                className="card bg-base-100 shadow-xl rounded-lg overflow-hidden"
              >
                <div className="card-body p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Preview Image - Low Quality */}
                    <div
                      className="relative rounded-lg overflow-hidden bg-base-200 w-full sm:w-48"
                      style={{
                        aspectRatio: `${variantDimensions.width} / ${variantDimensions.height}`,
                      }}
                    >
                      <IKImage
                        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                        path={product.imageUrl}
                        alt={`Order ${order._id?.toString().slice(-6)}`}
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

                    {/* Order Details */}
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row justify-between items-start">
                        <div className="mb-4 sm:mb-0">
                          <h2 className="text-xl font-bold mb-2">
                            Order #{order._id?.toString().slice(-6)}
                          </h2>
                          <div className="space-y-1 text-base-content/70">
                            <p>Payment Successful</p>
                            <p>
                              Quantity:{" "}
                              <span className="capitalize">{order.quantity}</span>
                            </p>

                            <p>
                              Shipping Status:{" "}
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === "completed"
                                    ? "bg-success/20 text-success"
                                    : order.status === "failed"
                                    ? "bg-error/20 text-error"
                                    : "bg-warning/20 text-warning"
                                }`}
                              >
                                {order.status}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold mb-4">
                            ₹ {order.amount}
                          </p>
                          {order.status === "pending" && (
                            <button
                              onClick={() =>
                                window.open(
                                  `/api/invoice?orderId=${order._id}`,
                                  "_blank"
                                )
                              }
                              className="mt-4 bg-green-600 text-white px-6 py-2 rounded shadow"
                            >
                              Download Invoice
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
