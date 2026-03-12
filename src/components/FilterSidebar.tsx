"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSidebarProps {
  onFilterChange: (filters: Filters) => void;
  filters: Filters;
  mobileOpen: boolean;
  onClose: () => void;
}

export interface Filters {
  category: string;
  priceRange: string;
  sizes: string[];
  colors: string[];
}

const categories = ["All", "Women", "Men", "Shoes", "Accessories"];
const priceRanges = ["All", "Under $50", "$50 - $100", "$100 - $200", "Over $200"];
const sizes = ["S", "M", "L", "XL"];
const colors = ["Black", "White", "Gray", "Beige", "Navy"];

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold tracking-wider uppercase mb-3"
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FilterSidebar({ onFilterChange, filters, mobileOpen, onClose }: FilterSidebarProps) {
  const content = (
    <div className="space-y-0">
      <FilterGroup title="Category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange({ ...filters, category: cat })}
              className={`block text-sm w-full text-left py-1 transition-colors ${filters.category === cat ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range}
              onClick={() => onFilterChange({ ...filters, priceRange: range })}
              className={`block text-sm w-full text-left py-1 transition-colors ${filters.priceRange === range ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {range}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const active = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => {
                  const newSizes = active ? filters.sizes.filter((s) => s !== size) : [...filters.sizes, size];
                  onFilterChange({ ...filters, sizes: newSizes });
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${active ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="space-y-2">
          {colors.map((color) => {
            const active = filters.colors.includes(color);
            return (
              <button
                key={color}
                onClick={() => {
                  const newColors = active ? filters.colors.filter((c) => c !== color) : [...filters.colors, color];
                  onFilterChange({ ...filters, colors: newColors });
                }}
                className={`block text-sm w-full text-left py-1 transition-colors ${active ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {color}
              </button>
            );
          })}
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block w-64 shrink-0 pr-8">{content}</aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-background z-50 p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={onClose}><X className="h-5 w-5" /></button>
              </div>
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
