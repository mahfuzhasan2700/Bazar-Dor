import React from "react";
import HeroBanner from "@/components/HeroBanner";
import PriceTicker from "@/components/PriceTicker";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api";
import { toBanglaNumber } from "@/lib/utils";

export default async function HomePage() {
  const products = await getAllProducts();

  // Top 6 risers (আজ দাম বেড়েছে ▲)
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // Top 6 fallers (আজ দাম কমেছে ▼)
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      {/* Price Ticker directly under Navbar */}
      <PriceTicker products={products} />

      {/* Hero Banner with CTA smooth scroll to #সব-পণ্য */}
      <HeroBanner />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-14">
        {/* Section A: আজ দাম বেড়েছে */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-[#d03739]">▲</span>
              <span>আজ দাম বেড়েছে</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section B: আজ দাম কমেছে */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-[#05893e]">▼</span>
              <span>আজ দাম কমেছে</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section C: সব পণ্য (All Products) */}
        <section id="সব-পণ্য" className="space-y-4 scroll-mt-24">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              সব পণ্য
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
