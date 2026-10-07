"use client";

import React from "react";
import { Product } from "@/types";
import { toBanglaNumber, formatBanglaUnit } from "@/lib/utils";
import Link from "next/link";

interface PriceTickerProps {
  products?: Product[];
}

export default function PriceTicker({ products = [] }: PriceTickerProps) {
  // If no products passed yet, display placeholder or empty
  if (!products || products.length === 0) {
    return null;
  }

  // Double the list for seamless infinite marquee loop
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-emerald-50/70 border-b border-emerald-100 overflow-hidden py-1.5 text-xs">
      <div className="flex animate-marquee items-center gap-6">
        {tickerItems.map((item, index) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";

          return (
            <Link
              key={`${item.id}-${index}`}
              href={`/product/${item.id}`}
              className="flex items-center gap-1.5 shrink-0 hover:opacity-80 transition cursor-pointer"
            >
              <span>{item.image || item.categoryIcon}</span>
              <span className="font-medium text-gray-800">{item.nameBn}</span>
              <span className="text-gray-600">
                {toBanglaNumber(item.today)} টাকা/{formatBanglaUnit(item.unit).replace("প্রতি ", "")}
              </span>
              <span
                className={`flex items-center font-semibold text-[11px] px-1 py-0.5 rounded ${
                  isUp
                    ? "text-emerald-700 bg-emerald-100/60"
                    : isDown
                    ? "text-red-700 bg-red-100/60"
                    : "text-gray-600 bg-gray-100"
                }`}
              >
                {isUp ? "▲ " : isDown ? "▼ " : "— "}
                {toBanglaNumber(Math.abs(item.change?.pct || 0))}%
              </span>
              <span className="text-gray-300 ml-2">•</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
