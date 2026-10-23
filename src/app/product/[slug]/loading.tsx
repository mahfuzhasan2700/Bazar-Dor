import React from "react";

export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-48 bg-gray-200 rounded-md" />

      {/* Summary Card Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-200 shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-28 bg-gray-200 rounded-full" />
            <div className="h-8 w-56 bg-gray-200 rounded-lg" />
            <div className="h-4 w-72 bg-gray-200 rounded-md" />
          </div>
        </div>
        <div className="h-12 w-32 bg-gray-200 rounded-xl" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-2">
            <div className="h-3 w-20 bg-gray-200 rounded-md" />
            <div className="h-6 w-24 bg-gray-200 rounded-md" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded-md" />
        <div className="h-48 bg-gray-100 rounded-2xl" />
      </div>
    </div>
  );
}
