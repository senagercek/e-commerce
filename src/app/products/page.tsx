"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar, Filters } from "@/components/FilterSidebar";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";

  const [filters, setFilters] = useState<Filters>({
    category: categoryParam,
    priceRange: "All",
    sizes: [],
    colors: [],
  });
  const [mobileFilters, setMobileFilters] = useState(false);

  // Sync category state with URL param
  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: categoryParam }));
  }, [categoryParam]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.category !== "All" && p.category !== filters.category) return false;
      if (filters.sizes.length > 0 && !filters.sizes.some((s) => p.sizes.includes(s))) return false;
      if (filters.colors.length > 0 && !filters.colors.some((c) => p.colors.includes(c))) return false;
      if (filters.priceRange !== "All") {
        if (filters.priceRange === "Under $50" && p.price >= 50) return false;
        if (filters.priceRange === "$50 - $100" && (p.price < 50 || p.price > 100)) return false;
        if (filters.priceRange === "$100 - $200" && (p.price < 100 || p.price > 200)) return false;
        if (filters.priceRange === "Over $200" && p.price <= 200) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="container-fashion py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold">
            {filters.category === "All" ? "All Products" : filters.category}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{filtered.length} products</p>
        </div>
        <button
          onClick={() => setMobileFilters(true)}
          className="lg:hidden flex items-center gap-2 text-sm font-medium border border-border px-4 py-2 rounded-lg"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="flex">
        <FilterSidebar filters={filters} onFilterChange={setFilters} mobileOpen={mobileFilters} onClose={() => setMobileFilters(false)} />
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container-fashion py-20 text-center">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
