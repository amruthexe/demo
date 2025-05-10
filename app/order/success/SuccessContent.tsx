"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (!orderId) return <p className="p-8 text-center">Missing order ID</p>;

  const handleDownload = () => {
    window.open(`/api/invoice?orderId=${orderId}`, "_blank");
  };

  return (
    <div className="p-8 text-center">
      <div className="flex justify-center mb-6">
        <Image src="/logo.png" alt="Company Logo" width={120} height={60} />
      </div>
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg">Your order has been placed successfully.</p>
      <button
        onClick={handleDownload}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded shadow"
      >
        Download Invoice
      </button>
    </div>
  );
}
