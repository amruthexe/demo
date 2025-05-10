import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { IProduct, IMAGE_VARIANTS } from "@/models/Product";
import { Eye } from "lucide-react";

export default function ProductCard({ product }: { product: IProduct }) {
  const lowestPrice = product.variants.reduce(
    (min, variant) => (variant.price < min ? variant.price : min),
    product.variants[0]?.price || 0
  );

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <Link
          href={`/products/${product._id}`}
          className="relative group w-full"
        >
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{
              aspectRatio:
                IMAGE_VARIANTS.SQUARE.dimensions.width /
                IMAGE_VARIANTS.SQUARE.dimensions.height,
            }}
          >
            <IKImage
              path={product.imageUrl}
              alt={product.name}
              loading="eager"
              transformation={[
                {
                  height: IMAGE_VARIANTS.SQUARE.dimensions.height.toString(),
                  width: IMAGE_VARIANTS.SQUARE.dimensions.width.toString(),
                  cropMode: "extract",
                  focus: "center",
                  quality: "80",
                },
              ]}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Hover overlay with product name */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 group-hover:backdrop-blur-sm transition-all duration-300 rounded-xl">
              <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                {product.name}
              </span>
            </div>
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/products/${product._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{product.name}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="card-actions justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold">
            ₹ {lowestPrice.toFixed(2)} /-
            </span>
           
          </div>

          <Link
            href={`/products/${product._id}`}
            className="btn btn-primary btn-sm gap-2"
          >
            <Eye className="w-4 h-4" />
            View Options
          </Link>
        </div>
      </div>
    </div>
  );
}
