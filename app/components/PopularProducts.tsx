import { IKImage } from "imagekitio-next";
import { IProduct, IMAGE_VARIANTS } from "@/models/Product";
import Link from "next/link";

interface PopularProductsProps {
  products: IProduct[];
}

export default function PopularProducts({ products }: PopularProductsProps) {
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-white">Popular Products</h2>
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
                    <span className="text-xs bg-red-900/80 text-white px-2 py-1 rounded-full">
                     View more Details
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
} 