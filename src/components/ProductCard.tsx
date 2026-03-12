import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, wishlist, toggleWishlist } = useCart();
  const isWished = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all ${isWished ? "opacity-100" : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"}`}
          >
            <Heart className={`h-4 w-4 transition-colors ${isWished ? "fill-red-500 text-red-500" : ""}`} />
          </button>

          {/* Quick add */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={(e) => { e.preventDefault(); addItem(product, product.sizes[1] || product.sizes[0]); }}
              className="w-full bg-foreground text-background py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          </div>

          {/* Out of stock badge */}
          {!product.inStock && (
            <div className="absolute top-3 left-3 bg-background/90 text-foreground text-xs font-medium px-3 py-1 rounded-full">
              Sold Out
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground tracking-wider uppercase">{product.brand}</p>
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-sm font-semibold">${product.price}</p>
      </div>
    </motion.div>
  );
}
