import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Product } from "@/types";
import { toBanglaNumber, formatPrice, formatBanglaUnit } from "@/lib/utils";

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const products: Product[] = await res.json();
    return (
      products.find(
        (p) =>
          p.slug.toLowerCase() === slug.toLowerCase() ||
          String(p.id) === slug
      ) || null
    );
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Calculate statistics across markets
  const markets = product.markets && product.markets.length > 0 ? product.markets : [];
  const allMins = markets.map((m) => m.min);
  const allMaxs = markets.map((m) => m.max);
  const minPrice = allMins.length > 0 ? Math.min(...allMins) : product.today;
  const maxPrice = allMaxs.length > 0 ? Math.max(...allMaxs) : product.today;
  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
        )
      : product.today;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  // Calculate difference from yesterday
  const priceDiff = Math.abs((product.today || 0) - (product.yesterday || product.today || 0));
  const changeStatement = isUp
    ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBanglaNumber(priceDiff)} টাকা`
    : isDown
    ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBanglaNumber(priceDiff)} টাকা`
    : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  const unitShort = formatBanglaUnit(product.unit).replace("প্রতি ", "");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-emerald-700 transition">
          হোম
        </Link>
        <span className="text-gray-400">&gt;</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-700 transition"
        >
          {product.categoryNameBn}
        </Link>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </div>

      {/* Card 1: Top Summary Card matching Product Details.png */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-xs">
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mb-1.5">
              {formatBanglaUnit(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="text-xs sm:text-sm text-gray-700 font-medium">
              {changeStatement}
            </p>
          </div>
        </div>

        {/* Distinct Right Gray Box */}
        <div className="bg-gray-50/90 rounded-2xl p-4 sm:p-5 text-center min-w-[130px] self-stretch sm:self-auto border border-gray-100/60 flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500 font-normal">আজকের দাম</span>
          <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-none my-1.5">
            {toBanglaNumber(product.today)}
          </span>
          <span className="text-xs text-gray-500 mb-2">
            টাকা / {unitShort}
          </span>
          <div
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
              isUp
                ? "text-[#d03739] bg-rose-50"
                : isDown
                ? "text-[#05893e] bg-emerald-50"
                : "text-gray-500 bg-gray-200/60"
            }`}
          >
            <span>{isUp ? "▲ " : isDown ? "▼ " : "— "}</span>
            <span>{toBanglaNumber(Math.abs(product.change?.pct || 0))}%</span>
          </div>
        </div>
      </div>

      {/* Card 2: Combined Summary & Market-wise Table Card matching Product Details.png */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-8">
        {/* Section 1: দামের সারসংক্ষেপ */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: সর্বনিম্ন দাম */}
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100">
              <span className="text-xs text-gray-500 font-normal block mb-1">
                সর্বনিম্ন দাম
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#05893e] block mb-1">
                {formatPrice(minPrice)} টাকা
              </span>
              <span className="text-xs text-gray-400 font-normal block">
                সবচেয়ে কম দামের বাজার
              </span>
            </div>

            {/* Box 2: সর্বাধিক দাম */}
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100">
              <span className="text-xs text-gray-500 font-normal block mb-1">
                সর্বাধিক দাম
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#d03739] block mb-1">
                {formatPrice(maxPrice)} টাকা
              </span>
              <span className="text-xs text-gray-400 font-normal block">
                সবচেয়ে বেশি দামের বাজার
              </span>
            </div>

            {/* Box 3: গড় দাম */}
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100">
              <span className="text-xs text-gray-500 font-normal block mb-1">
                গড় দাম
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#05893e] block mb-1">
                {formatPrice(avgPrice)} টাকা
              </span>
              <span className="text-xs text-gray-400 font-normal block">
                প্রতি {unitShort}-এর হিসাবে
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: বাজারভিত্তিক আজকের দাম */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 font-normal">
                  <th className="py-3 px-4 font-normal">বাজার</th>
                  <th className="py-3 px-4 font-normal">বিভাগ</th>
                  <th className="py-3 px-4 font-normal">সর্বনিম্ন</th>
                  <th className="py-3 px-4 font-normal">সর্বাধিক</th>
                  <th className="py-3 px-4 font-normal">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {markets.map((m, idx) => {
                  const itemAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={`${m.market}-${idx}`}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-medium text-gray-900">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-4 text-gray-800">
                        {toBanglaNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-gray-800">
                        {toBanglaNumber(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">
                        {toBanglaNumber(itemAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
