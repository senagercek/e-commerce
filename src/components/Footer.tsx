import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "Women", href: "/products?category=Women" },
    { label: "Men", href: "/products?category=Men" },
    { label: "Accessories", href: "/products?category=Accessories" },
    { label: "New Arrivals", href: "/products" },
  ],
  Help: [
    { label: "Customer Service", href: "#" },
    { label: "Shipping & Returns", href: "#" },
    { label: "Size Guide", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Press", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-fashion py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold tracking-[0.2em] mb-4">SENORA</h3>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Redefining modern fashion with timeless pieces crafted for the contemporary wardrobe.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/60 hover:text-background transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-background/60 hover:text-background transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-background/60 hover:text-background transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold tracking-wider uppercase mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">© 2026 SENORA. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-background/40 hover:text-background/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-background/40 hover:text-background/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
