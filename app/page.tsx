"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/models/Product";
import { apiClient } from "@/lib/api-client";
import Hero from "./components/Hero";
import PopularProducts from "./components/PopularProducts";
import Footer from "./components/Footer";
import { Loader2 } from "lucide-react";
import ProductReviews from "./components/ProductReviews";
import Link from "next/link";


export default function HomePage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiClient.getProducts();
        // Get the first 8 products for the popular section
        setProducts(data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main>
      <Hero />
      <PopularProducts products={products} />
      <div className="flex justify-center my-8">
        <Link href="/products" className="btn bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-full font-semibold shadow-md transition">
          View All Products
        </Link>
      </div>
      <ProductReviews />
    
      <div className="h-12" />
      <Footer />
    </main>
  );
}
