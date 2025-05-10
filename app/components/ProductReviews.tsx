import React from "react";

interface Review {
  name: string;
  rating: number;
  text: string;
}

const mockReviews: Review[] = [
  {
    name: "Amit Sharma",
    rating: 5,
    text: "Excellent product! The quality is top-notch and delivery was super fast. Highly recommended for every Indian household.",
  },
  {
    name: "Priya Singh",
    rating: 4,
    text: "Very useful and value for money. Packaging was good and the product works as described.",
  },
  {
    name: "Rahul Verma",
    rating: 5,
    text: "I have tried many brands, but this one stands out. Will definitely buy again!",
  },
  {
    name: "Sneha Patel",
    rating: 4,
    text: "Good experience overall. Customer support was also very helpful.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) =>
        i < rating ? "★" : <span key={i} className="text-gray-600">☆</span>
      )}
    </span>
  );
}

export default function ProductReviews() {
  return (
    <section className="mt-12 mb-12 bg-neutral-900 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Customer Reviews</h2>
      <div className="space-y-6">
        {mockReviews.map((review, idx) => (
          <div key={idx} className="border-b border-neutral-700 pb-4">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-semibold text-white">{review.name}</span>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-white/90">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 