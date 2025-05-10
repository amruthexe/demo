"use client";

import { IKImage } from "imagekitio-next";
import {
  IProduct,
  ImageVariant,
  IMAGE_VARIANTS,
  ImageVariantType,
} from "@/models/Product";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, AlertCircle, ShoppingCart } from "lucide-react";
import { useNotification } from "@/app/components/Notification";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api-client";
import CheckoutForm from "@/app/components/CheckoutForm";
import { useCart } from "@/app/components/CartContext";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { showNotification } = useNotification();
  const router = useRouter();
  const { data: session } = useSession();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const id = params?.id;

      if (!id) {
        setError("Product ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await apiClient.getProduct(id.toString());
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params?.id]);

  const handlePurchase = async (variant: ImageVariant, shippingAddress: any) => {
    if (!session) {
      showNotification("Please login to make a purchase", "error");
      router.push("/register");
      return;
    }

    if (!product?._id) {
      showNotification("Invalid product", "error");
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Check if Razorpay script is loaded
      if (!(window as any).Razorpay) {
        console.error("Razorpay script not loaded. Attempting to load...");
        // Try to load the script dynamically
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onerror = () => {
          console.error("Failed to load Razorpay script");
          showNotification("Payment system is not available. Please try again later.", "error");
          setIsProcessingPayment(false);
        };
        document.body.appendChild(script);
        return;
      }

      const { orderId, amount, dbOrderIds } = await apiClient.createOrder({
        items: [{
          productId: product._id.toString(),
          variant,
          quantity
        }],
        shippingAddress,
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "vevvion Shop",
        description: `${product.name} - ${variant.type} Version x${quantity}`,
        order_id: orderId,
        handler: function () {
          showNotification("Payment successful!", "success");
          router.push(`/order/success?orderId=${dbOrderIds[0]}`);
        },
        prefill: {
          email: shippingAddress.email,
          contact: shippingAddress.phone,
          name: shippingAddress.fullName,
        },
        theme: {
          color: "#16a34a",
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
          }
        }
      };

      if (!(window as any).Razorpay) {
        console.error("Razorpay script not loaded after order creation");
        showNotification("Payment system is not available. Please try again later.", "error");
        setIsProcessingPayment(false);
        return;
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in handlePurchase:", error);
      showNotification(
        error instanceof Error ? error.message : "Payment failed. Please try again.",
        "error"
      );
      setIsProcessingPayment(false);
    }
  };

  const handleAddToCart = () => {
    if (!session) {
      showNotification("Please login to add items to cart", "error");
      router.push("/register");
      return;
    }

    if (!product?._id) {
      showNotification("Product not found", "error");
      return;
    }

    const defaultVariant = product.variants[0];
    if (!defaultVariant) {
      showNotification("No variant available", "error");
      return;
    }

    addToCart({
      product: {
        _id: product._id.toString(),
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl
      },
      variant: defaultVariant,
      quantity
    });
  };

  const getTransformation = (variantType: ImageVariantType) => {
    const variant = IMAGE_VARIANTS[variantType];
    return [
      {
        width: variant.dimensions.width.toString(),
        height: variant.dimensions.height.toString(),
        cropMode: "extract",
        focus: "center",
        quality: "60",
      },
    ];
  };

  const calculateTotalPrice = (variant: ImageVariant) => {
    return variant.price * quantity;
  };

  if (loading)
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );

  if (error || !product)
    return (
      <div className="alert alert-error max-w-md mx-auto my-8">
        <AlertCircle className="w-6 h-6" />
        <span>{error || "Product not found"}</span>
      </div>
    );

  const defaultVariant = product.variants[0];
  const totalPrice = calculateTotalPrice(defaultVariant);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              aspectRatio: defaultVariant
                ? `${IMAGE_VARIANTS[defaultVariant.type].dimensions.width} / ${IMAGE_VARIANTS[defaultVariant.type].dimensions.height}`
                : "1 / 1",
            }}
          >
            <IKImage
              urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
              path={product.imageUrl}
              alt={product.name}
              transformation={getTransformation(defaultVariant.type)}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* <div className="text-sm text-center text-base-content/70">
            Preview:{" "}
            {IMAGE_VARIANTS[
              defaultVariant.type.toUpperCase() as keyof typeof IMAGE_VARIANTS
            ].dimensions.width}{" "}
            x{" "}
            {IMAGE_VARIANTS[
              defaultVariant.type.toUpperCase() as keyof typeof IMAGE_VARIANTS
            ].dimensions.height}
            px
          </div> */}
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-base-content/80 text-lg">{product.description}</p>
          </div>

          {/* Quantity & Buttons */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  −
                </button>
                <span className="text-xl font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <div className="text-sm text-base-content/70">Total Price</div>
                <span className="text-2xl font-bold">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="btn btn-primary btn-lg flex-1 gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                className="btn bg-green-600 text-white btn-lg flex-1"
                onClick={() => {
                  if (!session) {
                    router.push("/register");
                    return;
                  }
                  setShowCheckout(true);
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutForm
          totalAmount={totalPrice}
          onSubmit={async (shippingAddress) => {
            try {
              await handlePurchase(defaultVariant, shippingAddress);
            } catch (error) {
              console.error("Error in checkout:", error);
              setIsProcessingPayment(false);
            }
          }}
          onCancel={() => {
            setShowCheckout(false);
            setIsProcessingPayment(false);
          }}
          isProcessing={isProcessingPayment}
        />
      )}
    </div>
  );
}
