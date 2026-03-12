"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const shipping = totalPrice > 100 ? 0 : 9.99;

  if (items.length === 0) {
    return (
      <div className="container-fashion py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-display font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground text-sm mb-6">Looks like you haven't added anything yet.</p>
        <Button asChild className="rounded-full px-8">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-fashion py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-display font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <motion.div
              key={`${item.product.id}-${item.size}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-4 sm:gap-6 border border-border rounded-xl p-4"
            >
              <Link href={`/product/${item.product.id}`} className="w-24 h-28 sm:w-28 sm:h-32 rounded-lg overflow-hidden bg-secondary shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                    </div>
                    <button onClick={() => removeItem(item.product.id, item.size)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center border border-border rounded-md">
                    <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="p-1.5 hover:bg-accent"><Minus className="h-3 w-3" /></button>
                    <span className="px-3 text-xs font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="p-1.5 hover:bg-accent"><Plus className="h-3 w-3" /></button>
                  </div>
                  <p className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-secondary rounded-xl p-6 h-fit sticky top-28">
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-semibold text-base">
              <span>Total</span><span>${(totalPrice + shipping).toFixed(2)}</span>
            </div>
          </div>
          <Button asChild className="w-full rounded-full mt-6" size="lg">
            <Link href="/checkout">Checkout</Link>
          </Button>
          <Link href="/products" className="block text-center text-xs text-muted-foreground mt-4 hover:text-foreground transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
