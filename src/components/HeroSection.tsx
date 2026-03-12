import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-fashion.jpg";

export function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <img
        src={heroImage.src}
        alt="Fashion collection hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/20" />

      <div className="relative h-full container-fashion flex items-end pb-16 sm:pb-24">
        <div className="max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-background/80 text-sm tracking-[0.3em] uppercase mb-3 font-body"
          >
            New Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-background text-5xl sm:text-7xl font-display font-bold leading-[0.95] mb-6"
          >
            Summer
            <br />
            2026
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild size="lg" className="rounded-full px-8 bg-background text-foreground hover:bg-background/90">
              <Link href="/products">Shop Now</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
