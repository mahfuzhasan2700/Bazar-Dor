"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { getCategories, getAllProducts } from "@/lib/api";
import { Product, Category } from "@/types";
import { ChevronDown, ArrowLeft, AlertCircle } from "lucide-react";
import { toBanglaNumber } from "@/lib/utils";

type SortOption = "default" | "price_asc" | "price_desc";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [categoriesData, allProdsData] = await Promise.all([
          getCategories(),
          getAllProducts(),
        ]);

        const currentCat = categoriesData.find(
          (c) =>
            c.slug.toLowerCase() === slug.toLowerCase() ||
            c.id.toLowerCase() === slug.toLowerCase()
        );
        setCategory(currentCat || null);

        const filtered = allProdsData.filter(
          (p) =>
            p.category?.toLowerCase() === slug.toLowerCase() ||
            p.slug?.toLowerCase() === slug.toLowerCase()
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Failed to load category data", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [slug]);

  // Handle Sort Option (Challenge C1: sorts by numeric value of price)
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price_asc") {
      return a.today - b.today;
    }
    if (sortBy === "price_desc") {
      return b.today - a.today;
    }
    return 0; // default order
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Category Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl shrink-0 shadow-xs">
          {category?.icon || "🛒"}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {category?.nameBn || slug}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            {toBanglaNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort Bar Card (Challenge C1) */}
      <div className="bg-white rounded-2xl px-6 py-3.5 border border-gray-100 shadow-xs flex items-center justify-end">
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs sm:text-sm font-medium text-gray-600">
            সাজান
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-200 text-xs sm:text-sm rounded-xl pl-3.5 pr-8 py-2 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price_asc">দাম: কম থেকে বেশি</option>
              <option value="price_desc">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Total Products Indicator text matching Category.png */}
      <div className="text-xs sm:text-sm text-gray-500 font-normal px-1 -mb-2">
        মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
      </div>

      {/* Product List or Skeleton or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-xs space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-700">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নিবন্ধিত নেই।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      )}
    </div>
  );
}
