"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone, DollarSign } from "lucide-react";

type PaymentMethod = "card" | "apple" | "paypal";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [submitted, setSubmitted] = useState(false);
  const shipping = totalPrice > 100 ? 0 : 9.99;

  if (submitted) {
    return (
      <div className="container-fashion py-20 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h1 className="text-3xl font-display font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground text-sm">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
      </div>
    );
  }

  return (
    <div className="container-fashion py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-display font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input placeholder="First Name" className="px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
              <input placeholder="Last Name" className="px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
              <input placeholder="Address" className="sm:col-span-2 px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
              <input placeholder="City" className="px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
              <input placeholder="ZIP Code" className="px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
              <input placeholder="Country" className="sm:col-span-2 px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { id: "card" as const, label: "Card", icon: CreditCard },
                { id: "apple" as const, label: "Apple Pay", icon: Smartphone },
                { id: "paypal" as const, label: "PayPal", icon: DollarSign },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayment(m.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border text-sm transition-colors ${
                    payment === m.id ? "border-foreground bg-accent" : "border-border hover:border-foreground/30"
                  }`}
                >
                  <m.icon className="h-5 w-5" />
                  {m.label}
                </button>
              ))}
            </div>

            {payment === "card" && (
              <div className="space-y-4">
                <input placeholder="Card Number" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="MM / YY" className="px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
                  <input placeholder="CVC" className="px-4 py-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-foreground/20" />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Order summary */}
        <div className="bg-secondary rounded-xl p-6 h-fit sticky top-28">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm border-t border-border pt-4">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-semibold text-base">
              <span>Total</span><span>${(totalPrice + shipping).toFixed(2)}</span>
            </div>
          </div>
          <Button
            className="w-full rounded-full mt-6"
            size="lg"
            onClick={() => { clearCart(); setSubmitted(true); }}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
