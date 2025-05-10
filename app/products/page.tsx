"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/models/Product";
import { apiClient } from "@/lib/api-client";
import Link from "next/link";
import { IKImage } from "imagekitio-next";
import { IMAGE_VARIANTS } from "@/models/Product";
import { Loader2 } from "lucide-react";
import Footer from "../components/Footer";

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiClient.getProducts();
        setProducts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-white">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => {
            const defaultVariant = product.variants[0];
            const dimensions = IMAGE_VARIANTS[defaultVariant.type].dimensions;
            return (
              <Link
                key={product._id?.toString()}
                href={`/products/${product._id}`}
                className="group block rounded-2xl shadow-md bg-black hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-red-900"
              >
                <div className="relative w-full aspect-square overflow-hidden bg-black">
                  <IKImage
                    urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                    path={product.imageUrl}
                    alt={product.name}
                    transformation={[
                      {
                        width: dimensions.width.toString(),
                        height: dimensions.height.toString(),
                        cropMode: "extract",
                        focus: "center",
                        quality: "70",
                      },
                    ]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-lg font-semibold tracking-wide">View Details</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1 text-white truncate">{product.name}</h3>
                  <p className="text-white text-sm line-clamp-2 mb-2 min-h-[2.5em]">{product.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-semibold text-red-600">₹{defaultVariant.price.toFixed(2)}</span>
                    <span className="text-xs bg-green-600/80 text-white px-4 py-2 rounded-full">
                    View More Details 
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="pt-12">
      <Footer/>

      </div>
     
    </main>
  );
} 