"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, Minus, Plus, ChevronLeft } from "lucide-react";
import { products } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find((p) => p.id === id);
  const { addItem, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container-fashion py-20 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link href="/products" className="text-sm underline mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  const isWished = wishlist.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0];
    for (let i = 0; i < quantity; i++) {
      addItem(product, size);
    }
  };

  return (
    <div className="container-fashion py-8">
      {/* Breadcrumb */}
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ChevronLeft className="h-4 w-4" /> Back to products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="aspect-[3/4] rounded-xl overflow-hidden bg-secondary"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">{product.brand}</p>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold mb-6">${product.price}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          {/* Size selector */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                    selectedSize === size
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-3">Quantity</p>
            <div className="inline-flex items-center border border-border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-accent transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-5 text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-accent transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleAddToCart} size="lg" className="flex-1 rounded-full" disabled={!product.inStock}>
              {product.inStock ? "Add to Cart" : "Sold Out"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-4"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={`h-5 w-5 ${isWished ? "fill-foreground" : ""}`} />
            </Button>
          </div>

          {/* Extra info */}
          <div className="mt-8 pt-8 border-t border-border space-y-3 text-sm text-muted-foreground">
            <p>✓ Free shipping on orders over $100</p>
            <p>✓ Free returns within 30 days</p>
            <p>✓ Sustainably sourced materials</p>
          </div>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-display font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
