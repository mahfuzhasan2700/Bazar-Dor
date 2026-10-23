import React from "react";
import ProductSkeleton from "@/components/ProductSkeleton";

export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Category Header Skeleton */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex items-center gap-4 animate-pulse">
        <div className="w-14 h-14 rounded-2xl bg-gray-200 shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-7 w-48 bg-gray-200 rounded-lg" />
          <div className="h-4 w-32 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* Grid of Product Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
