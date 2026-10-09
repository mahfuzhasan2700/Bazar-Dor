"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getProductByIdOrSlug, getAllProducts } from "@/lib/api";
import { Product } from "@/types";
import { toBanglaNumber, formatBanglaUnit } from "@/lib/utils";
import PriceTicker from "@/components/PriceTicker";
import toast from "react-hot-toast";
import {
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Store,
  MapPin,
  ShieldAlert,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const idOrSlug = resolvedParams.id;
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Protected route check
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("বিস্তারিত দেখতে অনুগ্রহ করে আগে লগইন করুন!");
      router.push(`/signin?redirect=/product/${idOrSlug}`);
    }
  }, [user, authLoading, router, idOrSlug]);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      try {
        const [prod, allProds] = await Promise.all([
          getProductByIdOrSlug(idOrSlug),
          getAllProducts(),
        ]);
        setProduct(prod);
        setAllProducts(allProds);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      loadProduct();
    }
  }, [idOrSlug, user]);

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-gray-600">
          অথেনটিকেশন যাচাই করা হচ্ছে...
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-44 bg-white rounded-3xl border border-gray-100 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-28 bg-white rounded-2xl border border-gray-100 animate-pulse"></div>
          <div className="h-28 bg-white rounded-2xl border border-gray-100 animate-pulse"></div>
          <div className="h-28 bg-white rounded-2xl border border-gray-100 animate-pulse"></div>
        </div>
        <div className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-sm text-gray-500">
          আপনার অনুরোধকৃত পণ্যের কোনো তথ্য সিস্টেমে নেই।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Calculate Price Statistics across markets
  const defaultMarkets = [
    { market: "মাঠ বাজার", division: "ময়মনসিংহ", min: Math.round(product.today * 0.89), max: Math.round(product.today * 0.98) },
    { market: "সদর বাজার", division: "রাজশাহী", min: Math.round(product.today * 0.91), max: Math.round(product.today * 1.0) },
    { market: "বাজারহাট", division: "খুলনা", min: Math.round(product.today * 0.91), max: Math.round(product.today * 1.01) },
    { market: "বাসারহাট বাজার", division: "রাজশাহী", min: Math.round(product.today * 0.91), max: Math.round(product.today * 1.03) },
    { market: "চৌর বাজার", division: "ময়মনসিংহ", min: Math.round(product.today * 0.91), max: Math.round(product.today * 1.04) },
    { market: "আমতলী বাজার", division: "চট্টগ্রাম", min: Math.round(product.today * 0.91), max: Math.round(product.today * 1.04) },
    { market: "ডবলগেট বাজার", division: "খুলনা", min: Math.round(product.today * 0.94), max: Math.round(product.today * 1.04) },
    { market: "চৌরাস্তা বাজার", division: "সিলেট", min: Math.round(product.today * 0.95), max: Math.round(product.today * 1.06) },
    { market: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", min: Math.round(product.today * 0.97), max: Math.round(product.today * 1.06) },
    { market: "চৌদগ্রাম বাজার", division: "চট্টগ্রাম", min: Math.round(product.today * 0.95), max: Math.round(product.today * 1.1) },
    { market: "আমবাজার", division: "সিলেট", min: Math.round(product.today * 0.97), max: Math.round(product.today * 1.1) },
    { market: "কারওয়ান বাজার", division: "ঢাকা", min: Math.round(product.today * 1.09), max: Math.round(product.today * 1.1) },
  ];

  const markets = product.markets && product.markets.length >= 6 ? product.markets : defaultMarkets;
  const sortedMarkets = [...markets].sort((a, b) => a.min - b.min);

  const minPrice = sortedMarkets.reduce((min, m) => (m.min < min ? m.min : min), sortedMarkets[0]?.min || product.today);
  const maxPrice = sortedMarkets.reduce((max, m) => (m.max > max ? m.max : max), sortedMarkets[0]?.max || product.today);
  const avgPrice = Math.round(sortedMarkets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / sortedMarkets.length) || product.today;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const rawDiff = Math.abs((product.today || 0) - (product.yesterday || 0));
  const priceDiff = rawDiff > 0 ? rawDiff : 2;
  const unitLabel = formatBanglaUnit(product.unit).replace("প্রতি ", "");

  return (
    <div>
      <PriceTicker products={allProducts} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-emerald-700 transition">
            হোম
          </Link>
          <span className="text-gray-400">&gt;</span>
          <Link
            href={`/categories/${product.category}`}
            className="hover:text-emerald-700 transition"
          >
            {product.categoryNameBn}
          </Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-600 font-medium">{product.nameBn}</span>
        </div>

        {/* Top Product Hero Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f4f7f4] border border-gray-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-xs">
              {product.image || product.categoryIcon || "🛒"}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {product.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-normal">
                প্রতি {unitLabel} • {product.categoryNameBn}
              </p>
              <p className="text-xs text-gray-600 font-medium pt-1">
                {isUp
                  ? `গতকালের তুলনায় আজ দাম বেড়েছে + ${toBanglaNumber(priceDiff)} টাকা`
                  : isDown
                  ? `গতকালের তুলনায় আজ দাম কমেছে - ${toBanglaNumber(priceDiff)} টাকা`
                  : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
              </p>
            </div>
          </div>

          {/* Today's Rate Box */}
          <div className="w-full md:w-auto bg-[#f8faf8] rounded-xl px-6 py-4 border border-gray-100 text-center min-w-[140px] sm:min-w-[150px] shrink-0">
            <span className="text-xs text-gray-500 font-medium block">
              আজকের দর
            </span>
            <span className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight block my-0.5">
              {toBanglaNumber(product.today)}
            </span>
            <span className="text-xs text-gray-500 block mb-1">
              টাকা / {unitLabel}
            </span>
            <span
              className={`font-bold text-xs flex items-center justify-center gap-1 ${
                isUp
                  ? "text-[#d03739]"
                  : isDown
                  ? "text-[#05893e]"
                  : "text-gray-500"
              }`}
            >
              {isUp ? "▲ " : isDown ? "▼ " : "— "}
              {toBanglaNumber(Math.abs(product.change?.pct || 0))}%
            </span>
          </div>
        </div>

        {/* Section 1: দামের সারসংক্ষেপ (Price Summary) */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1: সর্বনিম্ন দর */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <span className="text-xs text-gray-500 font-medium block">
                সর্বনিম্ন দর
              </span>
              <div className="my-1.5">
                <span className="text-2xl sm:text-3xl font-black text-[#05893e]">
                  {toBanglaNumber(minPrice)} টাকা
                </span>
              </div>
              <p className="text-xs text-gray-400 font-normal">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Card 2: সর্বাধিক দর */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <span className="text-xs text-gray-500 font-medium block">
                সর্বাধিক দর
              </span>
              <div className="my-1.5">
                <span className="text-2xl sm:text-3xl font-black text-[#d03739]">
                  {toBanglaNumber(maxPrice)} টাকা
                </span>
              </div>
              <p className="text-xs text-gray-400 font-normal">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Card 3: গড় দর */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <span className="text-xs text-gray-500 font-medium block">
                গড় দর
              </span>
              <div className="my-1.5">
                <span className="text-2xl sm:text-3xl font-black text-[#05893e]">
                  {toBanglaNumber(avgPrice)} টাকা
                </span>
              </div>
              <p className="text-xs text-gray-400 font-normal">
                প্রতি {unitLabel}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: বাজারভিত্তিক আজকের দাম (Market Breakdown Table) */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#fafbfa] text-xs font-semibold text-gray-500">
                    <th className="py-3 px-6 text-left">বাজার</th>
                    <th className="py-3 px-6 text-left">বিভাগ</th>
                    <th className="py-3 px-6 text-right">সর্বনিম্ন</th>
                    <th className="py-3 px-6 text-right">সর্বোচ্চ</th>
                    <th className="py-3 px-6 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sortedMarkets.map((m, idx) => {
                    const rowAvg = (m.min + m.max) / 2;
                    const formattedAvg =
                      rowAvg % 1 === 0
                        ? toBanglaNumber(rowAvg)
                        : toBanglaNumber(rowAvg.toFixed(2));

                    return (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        <td className="py-3.5 px-6 font-medium text-gray-900">
                          {m.market}
                        </td>
                        <td className="py-3.5 px-6 text-gray-600">
                          {m.division}
                        </td>
                        <td className="py-3.5 px-6 text-right text-gray-700 font-medium">
                          {toBanglaNumber(m.min)} টাকা
                        </td>
                        <td className="py-3.5 px-6 text-right text-gray-700 font-medium">
                          {toBanglaNumber(m.max)} টাকা
                        </td>
                        <td className="py-3.5 px-6 text-right text-gray-900 font-semibold">
                          {formattedAvg} টাকা
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
    </div>
  );
}
