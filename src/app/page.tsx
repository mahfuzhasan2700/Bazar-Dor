import React from "react";
import HeroBanner from "@/components/HeroBanner";
import PriceTicker from "@/components/PriceTicker";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api";
import { toBanglaNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, LayoutGrid } from "lucide-react";

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* Section A: আজ দাম বেড়েছে ▲ */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span>আজ দাম বেড়েছে</span>
                <span className="text-emerald-600 text-sm sm:text-base font-extrabold">
                  ▲
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                গতকালের তুলনায় যেসব পণ্যের দাম সবচেয়ে বেশি বৃদ্ধি পেয়েছে
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section B: আজ দাম কমেছে ▼ */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span>আজ দাম কমেছে</span>
                <span className="text-red-500 text-sm sm:text-base font-extrabold">
                  ▼
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                গতকালের তুলনায় যেসব পণ্যের দাম সবচেয়ে বেশি হ্রাস পেয়েছে
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section C: সব পণ্য (All Products) */}
        <section id="সব-পণ্য" className="space-y-4 scroll-mt-24">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  সব পণ্য
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  মোট {toBanglaNumber(products.length)}টি নিত্যপ্রয়োজনীয় পণ্য তালিকাভুক্ত
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
