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

  // Group markets by division
  const marketsByDivision = markets.reduce(
    (acc, market) => {
      if (!acc[market.division]) acc[market.division] = [];
      acc[market.division].push(market);
      return acc;
    },
    {} as Record<string, typeof markets>
  );

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

      {/* Top Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50/60 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                {product.categoryNameBn}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                {formatBanglaUnit(product.unit)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              আজকের বাজার অনুযায়ী সর্বশেষ তথ্য ও বিভিন্ন বাজারের তুলনামূলক চিত্র
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
          <div className="text-left sm:text-right">
            <span className="block text-xs text-gray-400">আজকের গড় দাম</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {formatPrice(product.today)}{" "}
              <span className="text-sm font-normal text-gray-600">টাকা</span>
            </span>
          </div>
          <div
            className={`mt-1.5 text-xs font-bold inline-flex items-center gap-1 px-2.5 py-1 rounded-md ${
              isUp
                ? "text-[#d03739] bg-red-50"
                : isDown
                ? "text-[#05893e] bg-emerald-50"
                : "text-gray-600 bg-gray-100"
            }`}
          >
            <span>{isUp ? "▲ " : isDown ? "▼ " : "— "}</span>
            <span>{toBanglaNumber(Math.abs(product.change?.pct || 0))}%</span>
            <span className="font-normal text-[11px] ml-1">
              (গতকাল থেকে {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"})
            </span>
          </div>
        </div>
      </div>

      {/* Price Summary Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
          <span className="text-xs font-medium text-gray-500 block">সর্বনিম্ন দাম</span>
          <span className="text-xl sm:text-2xl font-bold text-emerald-700 mt-1 block">
            {formatPrice(minPrice)} <span className="text-xs font-normal text-gray-600">টাকা</span>
          </span>
          <span className="text-[11px] text-gray-400 mt-0.5 block">{formatBanglaUnit(product.unit)}</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
          <span className="text-xs font-medium text-gray-500 block">সর্বোচ্চ দাম</span>
          <span className="text-xl sm:text-2xl font-bold text-red-600 mt-1 block">
            {formatPrice(maxPrice)} <span className="text-xs font-normal text-gray-600">টাকা</span>
          </span>
          <span className="text-[11px] text-gray-400 mt-0.5 block">{formatBanglaUnit(product.unit)}</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
          <span className="text-xs font-medium text-gray-500 block">গড় দাম</span>
          <span className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 block">
            {formatPrice(avgPrice)} <span className="text-xs font-normal text-gray-600">টাকা</span>
          </span>
          <span className="text-[11px] text-gray-400 mt-0.5 block">{formatBanglaUnit(product.unit)}</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
          <span className="text-xs font-medium text-gray-500 block">বাজার সংখ্যা</span>
          <span className="text-xl sm:text-2xl font-bold text-[#09793c] mt-1 block">
            {toBanglaNumber(markets.length)} <span className="text-xs font-normal text-gray-600">টি</span>
          </span>
          <span className="text-[11px] text-gray-400 mt-0.5 block">{toBanglaNumber(Object.keys(marketsByDivision).length)}টি বিভাগে জরিপকৃত</span>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Markets Table) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            দেশের প্রধান প্রধান বাজারগুলোর বর্তমান মূল্য তালিকা
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/60">
                <th className="py-3 px-4 rounded-l-xl">বাজারের নাম</th>
                <th className="py-3 px-4">বিভাগ</th>
                <th className="py-3 px-4">সর্বনিম্ন দাম</th>
                <th className="py-3 px-4">সর্বোচ্চ দাম</th>
                <th className="py-3 px-4 rounded-r-xl">গড় দাম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {markets.map((m, idx) => {
                const itemAvg = Math.round((m.min + m.max) / 2);
                return (
                  <tr
                    key={`${m.market}-${idx}`}
                    className="hover:bg-emerald-50/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {m.market}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs">
                        {m.division}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-emerald-700">
                      {toBanglaNumber(m.min)} টাকা
                    </td>
                    <td className="py-3 px-4 font-medium text-red-600">
                      {toBanglaNumber(m.max)} টাকা
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">
                      {toBanglaNumber(itemAvg)} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Comparison */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            ঐতিহাসিক মূল্যের তুলনামূলক পর্যালোচনা
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            গতকালের তুলনায়, গত সপ্তাহ ও গত মাসের সাথে দামের গতিপ্রকৃতি
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
            <span className="text-xs text-gray-500 font-medium block">আজকের দাম</span>
            <span className="text-lg sm:text-xl font-bold text-gray-900 mt-1 block">
              {formatPrice(product.today)} টাকা
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
            <span className="text-xs text-gray-500 font-medium block">গতকাল</span>
            <span className="text-lg sm:text-xl font-bold text-gray-700 mt-1 block">
              {formatPrice(product.yesterday)} টাকা
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
            <span className="text-xs text-gray-500 font-medium block">গত সপ্তাহ</span>
            <span className="text-lg sm:text-xl font-bold text-gray-700 mt-1 block">
              {formatPrice(product.lastWeek)} টাকা
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
            <span className="text-xs text-gray-500 font-medium block">গত মাস</span>
            <span className="text-lg sm:text-xl font-bold text-gray-700 mt-1 block">
              {formatPrice(product.lastMonth)} টাকা
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
