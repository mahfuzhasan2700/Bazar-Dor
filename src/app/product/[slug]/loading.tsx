import React from "react";

export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-48 bg-gray-200 rounded-md" />

      {/* Top Card Skeleton */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-200 shrink-0" />
          <div className="space-y-2">
            <div className="h-7 w-48 bg-gray-200 rounded-lg" />
            <div className="h-4 w-32 bg-gray-200 rounded-md" />
            <div className="h-4 w-56 bg-gray-200 rounded-md" />
          </div>
        </div>
        <div className="h-28 w-32 bg-gray-100 rounded-2xl shrink-0" />
      </div>

      {/* Second Card Skeleton: 3 stats + Table */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-8">
        <div>
          <div className="h-6 w-36 bg-gray-200 rounded-md mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-5 space-y-2">
                <div className="h-3 w-20 bg-gray-200 rounded-md" />
                <div className="h-6 w-28 bg-gray-200 rounded-md" />
                <div className="h-3 w-32 bg-gray-100 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="h-6 w-44 bg-gray-200 rounded-md mb-4" />
          <div className="h-64 bg-gray-50 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
