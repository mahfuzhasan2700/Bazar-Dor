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
  const markets = product.markets || [];
  let minPrice = product.today;
  let maxPrice = product.today;
  let minMarket = "কারওয়ান বাজার";
  let maxMarket = "শান্তিনগর বাজার";

  if (markets.length > 0) {
    minPrice = markets[0].min;
    maxPrice = markets[0].max;
    minMarket = markets[0].market;
    maxMarket = markets[0].market;

    markets.forEach((m) => {
      if (m.min < minPrice) {
        minPrice = m.min;
        minMarket = m.market;
      }
      if (m.max > maxPrice) {
        maxPrice = m.max;
        maxMarket = m.market;
      }
    });
  }

  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length
        )
      : product.today;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <div>
      <PriceTicker products={allProducts} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-emerald-700 transition">
            হোম
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${product.category}`}
            className="hover:text-emerald-700 transition"
          >
            {product.categoryNameBn}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{product.nameBn}</span>
        </div>

        {/* Top Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-xs">
              {product.image || product.categoryIcon || "🛒"}
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {product.nameBn}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {product.categoryNameBn}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {formatBanglaUnit(product.unit)}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
                আজকের বাজার দর অনুযায়ী পণ্যের গড় মূল্য {toBanglaNumber(product.today)} টাকা ({formatBanglaUnit(product.unit)})
              </p>
            </div>
          </div>

          {/* Today's Price Stat Box */}
          <div className="w-full md:w-auto bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-100 flex items-center justify-between md:flex-col md:items-end gap-2">
            <div className="text-left md:text-right">
              <span className="text-xs text-gray-500 font-medium block">
                আজকের বাজার দর
              </span>
              <span className="text-2xl sm:text-3xl font-black text-gray-900">
                {toBanglaNumber(product.today)}{" "}
                <span className="text-sm font-semibold text-gray-600">টাকা</span>
              </span>
            </div>

            <div
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                isUp
                  ? "bg-emerald-100 text-emerald-800"
                  : isDown
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {isUp ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : isDown ? (
                <TrendingDown className="w-3.5 h-3.5" />
              ) : null}
              <span>
                {isUp ? "▲ " : isDown ? "▼ " : "— "}
                {toBanglaNumber(Math.abs(product.change?.pct || 0))}%
              </span>
            </div>
          </div>
        </div>

        {/* Price Summary (3 Stats Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Min Price */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              সর্বনিম্ন দাম
            </span>
            <div className="my-2">
              <span className="text-3xl font-black text-emerald-700">
                {toBanglaNumber(minPrice)}
              </span>{" "}
              <span className="text-sm font-semibold text-gray-600">টাকা</span>
            </div>
            <p className="text-xs text-gray-500 truncate flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-gray-400" />
              {minMarket}
            </p>
          </div>

          {/* Average Price */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              গড় দাম
            </span>
            <div className="my-2">
              <span className="text-3xl font-black text-blue-700">
                {toBanglaNumber(avgPrice)}
              </span>{" "}
              <span className="text-sm font-semibold text-gray-600">টাকা</span>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              সকল বাজারের সমন্বিত গড় মূল্য
            </p>
          </div>

          {/* Max Price */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              সর্বোচ্চ দাম
            </span>
            <div className="my-2">
              <span className="text-3xl font-black text-amber-700">
                {toBanglaNumber(maxPrice)}
              </span>{" "}
              <span className="text-sm font-semibold text-gray-600">টাকা</span>
            </div>
            <p className="text-xs text-gray-500 truncate flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-gray-400" />
              {maxMarket}
            </p>
          </div>
        </div>

        {/* বাজারভিত্তিক আজকের দাম (Market Breakdown Table) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span>বাজারভিত্তিক আজকের দাম</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                বিভিন্ন পাইকারি ও খুচরা বাজারের আজকের দরতালিকা
              </p>
            </div>
          </div>

          {markets.length === 0 ? (
            <p className="text-sm text-gray-500 py-6 text-center">
              বাজারভিত্তিক তথ্যাবলি শীঘ্রই আপডেট হবে।
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-4">বাজার</th>
                    <th className="py-3 px-4">বিভাগ</th>
                    <th className="py-3 px-4 text-right">সর্বনিম্ন</th>
                    <th className="py-3 px-4 text-right">সর্বোচ্চ</th>
                    <th className="py-3 px-4 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {markets.map((m, idx) => {
                    const rowAvg = Math.round((m.min + m.max) / 2);
                    return (
                      <tr
                        key={idx}
                        className="hover:bg-emerald-50/40 transition duration-150"
                      >
                        <td className="py-3.5 px-4 font-semibold text-gray-900 flex items-center gap-2">
                          <Store className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{m.market}</span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            {m.division}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold text-gray-700">
                          {toBanglaNumber(m.min)} টাকা
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold text-gray-700">
                          {toBanglaNumber(m.max)} টাকা
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-emerald-700">
                          {toBanglaNumber(rowAvg)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
