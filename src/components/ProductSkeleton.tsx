import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs animate-pulse flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
          <div className="w-14 h-4 rounded-full bg-gray-200"></div>
        </div>
        <div className="w-3/4 h-5 bg-gray-200 rounded-md mb-2"></div>
        <div className="w-1/3 h-3 bg-gray-200 rounded-md mb-4"></div>
      </div>
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="space-y-1">
          <div className="w-12 h-2.5 bg-gray-200 rounded-md"></div>
          <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
        </div>
        <div className="w-14 h-6 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
}
