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
      className="group bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top: Emoji Icon & Name/Unit in horizontal flex row */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-emerald-700 transition line-clamp-1">
              {product.nameBn}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {formatBanglaUnit(product.unit)}
            </p>
          </div>
        </div>
      </div>

      {/* Price Row & Change Badge */}
      <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
        <div>
          <span className="block text-[11px] text-gray-400 font-medium">
            আজকের দাম
          </span>
          <span className="text-base sm:text-lg font-extrabold text-gray-900">
            {toBanglaNumber(product.today)}{" "}
            <span className="text-xs font-semibold text-gray-600">টাকা</span>
          </span>
        </div>

        {/* Change Badge: UP is RED, DOWN is GREEN */}
        <div
          className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
              ? "bg-emerald-50 text-emerald-700"
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
