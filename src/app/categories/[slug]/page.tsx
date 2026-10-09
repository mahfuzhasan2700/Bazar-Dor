"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { getAllProducts, getCategories } from "@/lib/api";
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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
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

        setAllProducts(allProdsData);

        const currentCat = categoriesData.find(
          (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id === slug
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
    <div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Breadcrumb & Back */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-emerald-700 transition">
            হোম
          </Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-700 font-medium">
            {category?.nameBn || slug}
          </span>
        </div>

        {/* Category Header Card matching Image 3 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#f4f7f4] border border-gray-100 flex items-center justify-center text-3xl shrink-0 shadow-xs">
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

        {/* Sort Bar Card matching Image 3 */}
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
                className="appearance-none bg-white border border-gray-200 text-gray-800 text-xs sm:text-sm rounded-lg pl-3 pr-8 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-[#09793c]/20 focus:border-[#09793c] cursor-pointer shadow-xs"
              >
                <option value="default">ডিফল্ট</option>
                <option value="price_asc">দাম: কম থেকে বেশি</option>
                <option value="price_desc">দাম: বেশি থেকে কম</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Count Label */}
        {products.length > 0 && (
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State / 404 */}
        {!isLoading && products.length === 0 && (
          <div className="bg-white rounded-3xl p-8 sm:p-14 text-center max-w-lg mx-auto border border-gray-100 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="text-sm text-gray-500">
              দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো বাজার দরের তথ্য তালিকাভুক্ত নেই।
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </div>
        )}

        {/* Product List Grid (3 columns matching Image 3) */}
        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
