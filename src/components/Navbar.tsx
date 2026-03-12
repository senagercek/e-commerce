import { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Women", href: "/products?category=Women" },
  { label: "Men", href: "/products?category=Men" },
  { label: "Accessories", href: "/products?category=Accessories" },
];

export function Navbar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-fashion flex items-center justify-between h-20">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 -ml-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo */}
        <Link href="/" className="font-display text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase">
          SENORA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search" className="p-2 hover:bg-accent rounded-full transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/wishlist" className="p-2 hover:bg-accent rounded-full transition-colors hidden sm:flex">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="p-2 hover:bg-accent rounded-full transition-colors relative">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/login" className="p-2 hover:bg-accent rounded-full transition-colors hidden sm:flex">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border overflow-hidden"
          >
            <div className="container-fashion py-4">
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                className="w-full bg-secondary border-none outline-none px-4 py-3 rounded-lg text-sm font-body"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-border overflow-hidden bg-background"
          >
            <nav className="container-fashion py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium tracking-wider uppercase py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 pt-4 border-t border-border">
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm">
                  <Heart className="h-4 w-4" /> Wishlist
                </Link>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" /> Account
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
