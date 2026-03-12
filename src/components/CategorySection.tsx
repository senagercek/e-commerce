import Link from "next/link";
import { motion } from "framer-motion";
import categoryWomen from "@/assets/category-women.jpg";
import categoryMen from "@/assets/category-men.jpg";
import categoryShoes from "@/assets/category-shoes.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";

const categories = [
  { name: "Women", image: categoryWomen, href: "/products?category=Women" },
  { name: "Men", image: categoryMen, href: "/products?category=Men" },
  { name: "Shoes", image: categoryShoes, href: "/products?category=Shoes" },
  { name: "Accessories", image: categoryAccessories, href: "/products?category=Accessories" },
];

export function CategorySection() {
  return (
    <section className="container-fashion py-16 sm:py-24">
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-12">Shop by Category</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={cat.href} className="group block relative aspect-[3/4] rounded-xl overflow-hidden">
              <img
                src={cat.image.src}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="text-background text-xl sm:text-2xl font-display font-bold tracking-wider">{cat.name}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
