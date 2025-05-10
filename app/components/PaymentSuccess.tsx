// components/PaymentSuccess.tsx

"use client";

import { useRouter } from "next/navigation";

export default function PaymentSuccess({ orderId }: { orderId: string }) {
  const router = useRouter();

  const handleDownload = () => {
    window.open(`/api/invoice?orderId=${orderId}`, "_blank");
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
      <p className="mt-4">Thank you for your order. Your invoice is ready.</p>
      <button
        onClick={handleDownload}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        Download Invoice
      </button>
    </div>
  );
}
