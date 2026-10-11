import React from "react";
import ProductSkeleton from "@/components/ProductSkeleton";

export default function RootLoading() {
  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      {/* Hero Skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs animate-pulse">
          <div className="h-6 w-36 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-10 w-3/4 max-w-md bg-gray-200 rounded-xl mb-3"></div>
          <div className="h-4 w-full max-w-lg bg-gray-200 rounded-md mb-6"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="h-6 w-44 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
