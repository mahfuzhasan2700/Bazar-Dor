"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { toBanglaNumber, formatBanglaUnit } from "@/lib/utils";
import { getAllProducts } from "@/lib/api";
import Link from "next/link";

interface PriceTickerProps {
  products?: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  const [items, setItems] = useState<Product[]>(products || []);

  useEffect(() => {
    if (products && products.length > 0) {
      setItems(products);
    } else {
      getAllProducts().then((data) => {
        if (data && data.length > 0) setItems(data);
      });
    }
  }, [products]);

  // If no products passed yet, display placeholder or empty
  if (!items || items.length === 0) {
    return null;
  }

  // Double the list for seamless infinite marquee loop
  const tickerItems = [...items, ...items];

  return (
    <div className="bg-emerald-50/70 border-y border-emerald-100/50 overflow-hidden py-1.5 text-xs">
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
                className={`font-semibold text-xs ml-0.5 ${
                  isUp
                    ? "text-[#d03739]"
                    : isDown
                    ? "text-[#05893e]"
                    : "text-gray-500"
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
