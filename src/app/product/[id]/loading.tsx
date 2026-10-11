import React from "react";

export default function ProductDetailLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-40 bg-gray-200 rounded-md animate-pulse"></div>

      {/* Hero Card Skeleton */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e2e6e2] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-200 shrink-0"></div>
          <div className="space-y-2">
            <div className="h-7 w-48 bg-gray-200 rounded-md"></div>
            <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
          </div>
        </div>
        <div className="w-full md:w-36 h-24 bg-gray-100 rounded-xl"></div>
      </div>

      {/* Price Summary 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-28 bg-white rounded-2xl border border-[#e2e6e2] animate-pulse"></div>
        <div className="h-28 bg-white rounded-2xl border border-[#e2e6e2] animate-pulse"></div>
        <div className="h-28 bg-white rounded-2xl border border-[#e2e6e2] animate-pulse"></div>
      </div>

      {/* Table Skeleton */}
      <div className="h-72 bg-white rounded-2xl border border-[#e2e6e2] animate-pulse"></div>
    </div>
  );
}
