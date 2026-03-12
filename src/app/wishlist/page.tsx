"use client";

import Link from "next/link";
import { Heart, ShoppingBag, ChevronLeft, Trash2 } from "lucide-react";
import { products } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addItem } = useCart();
  
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-fashion py-8 min-h-[60vh]">
      {/* Breadcrumb */}
      <Link 
        href="/products" 
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" /> Continue Shopping
      </Link>

      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlistedProducts.length} {wishlistedProducts.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        {wishlistedProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {wishlistedProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 border-2 border-dashed border-border rounded-xl"
          >
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
              Save items you love here to keep track of them and see when they're back in stock.
            </p>
            <Button asChild className="rounded-full px-8">
              <Link href="/products">Explore Products</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommended for you section if empty */}
      {wishlistedProducts.length === 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Trending Now</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
