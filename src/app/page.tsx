"use client";

import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { ProductCard } from "@/components/ProductCard";
import { PromoBanner } from "@/components/PromoBanner";
import { Newsletter } from "@/components/Newsletter";
import { products } from "@/lib/data";
import { motion } from "framer-motion";

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <div>
      <HeroSection />
      <CategorySection />

      {/* Featured Products */}
      <section className="container-fashion py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-3">Featured Products</h2>
          <p className="text-muted-foreground text-sm">Curated pieces for the modern wardrobe</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <PromoBanner />
      <Newsletter />
    </div>
  );
};

export default Index;
