import React from "react";
import Image from "next/image";
import { getTodayBanglaDate } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

export default function HeroBanner() {
  const banglaDate = getTodayBanglaDate();

  return (
    <section className="bg-gradient-to-b from-emerald-50/50 to-white py-10 sm:py-14 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text Content */}
          <div className="md:col-span-7 space-y-4 sm:space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              {banglaDate}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              আজকের বাজারের দাম <span className="text-emerald-700">এক নজরে</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মশলার দাম — বাজারভিত্তিক বিস্তারিত,
              গড়, সর্বনিম্ন-সর্বোচ্চ এবং শতকরা পরিবর্তনের তথ্যাবলি।
            </p>

            <div className="pt-2 flex justify-center md:justify-start">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="md:col-span-5 flex justify-center items-center">
            <div className="relative w-64 sm:w-80 h-52 sm:h-64">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের তাজা শাকসবজি ও ফলমূল"
                fill
                priority
                className="object-contain drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
