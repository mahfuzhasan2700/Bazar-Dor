import React from "react";
import Image from "next/image";
import BanglaDate from "@/components/BanglaDate";

export default function HeroBanner() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4">
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text Content */}
          <div className="md:col-span-7 space-y-3.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#09793c] text-xs font-semibold">
              <BanglaDate />
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
              গড়, সর্বনিম্ন-সর্বাধিক এবং শতকরা পরিবর্তন এক জায়গায়।
            </p>

            <div className="pt-2 flex justify-center md:justify-start">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#09793c] hover:bg-[#076833] text-white font-semibold text-xs sm:text-sm shadow-xs transition"
              >
                <span>সব পণ্য দেখুন</span>
              </a>
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="md:col-span-5 flex justify-center items-center">
            <div className="relative w-56 sm:w-72 h-44 sm:h-56">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের তাজা শাকসবজি ও ফলমূল"
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
