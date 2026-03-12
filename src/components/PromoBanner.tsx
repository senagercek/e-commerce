import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import promoBanner from "@/assets/promo-banner.jpg";

export function PromoBanner() {
  return (
    <section className="container-fashion py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden h-[400px] sm:h-[500px]"
      >
        <img src={promoBanner.src} alt="Summer promo" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
          <p className="text-background/80 text-sm tracking-[0.3em] uppercase mb-3 font-body">Limited Time</p>
          <h2 className="text-background text-4xl sm:text-6xl font-display font-bold mb-4">Up to 40% Off</h2>
          <p className="text-background/80 text-sm mb-8 max-w-md font-body">
            Discover our exclusive summer sale on selected items from the latest collection.
          </p>
          <Button asChild size="lg" className="rounded-full px-8 bg-background text-foreground hover:bg-background/90">
            <Link href="/products">Shop the Sale</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
