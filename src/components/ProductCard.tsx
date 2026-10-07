import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBanglaNumber, formatBanglaUnit } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link
      href={`/product/${product.id}`}
      className="group interactive-card bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top: Emoji Icon & Category Tag */}
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
            {product.categoryNameBn}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-emerald-700 transition line-clamp-1">
          {product.nameBn}
        </h3>

        {/* Unit */}
        <p className="text-xs text-gray-500 font-medium mt-0.5 mb-4">
          {formatBanglaUnit(product.unit)}
        </p>
      </div>

      {/* Price Row & Change Badge */}
      <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
        <div>
          <span className="block text-[11px] text-gray-400 font-medium">
            আজকের দাম
          </span>
          <span className="text-base sm:text-lg font-extrabold text-gray-900">
            {toBanglaNumber(product.today)} <span className="text-xs font-semibold text-gray-600">টাকা</span>
          </span>
        </div>

        {/* Change Badge */}
        <div
          className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 ${
            isUp
              ? "bg-emerald-50 text-emerald-700"
              : isDown
              ? "bg-red-50 text-red-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{toBanglaNumber(Math.abs(product.change?.pct || 0))}%</span>
        </div>
      </div>
    </Link>
  );
}
