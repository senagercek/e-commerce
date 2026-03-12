"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-secondary py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container-fashion text-center max-w-2xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Stay in the Loop</h2>
        <p className="text-muted-foreground text-sm mb-8 font-body">
          Subscribe to get early access to new arrivals, exclusive offers, and style inspiration.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-full border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-foreground/20 font-body"
            required
          />
          <Button type="submit" className="rounded-full px-8">
            Subscribe
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
