"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import BanglaDate from "@/components/BanglaDate";
import PriceTicker from "@/components/PriceTicker";
import { User as UserIcon, ChevronDown } from "lucide-react";

const CATEGORIES = [
  { slug: "chal", name: "চাল", icon: "🍚" },
  { slug: "dal", name: "ডাল", icon: "🍲" },
  { slug: "tel", name: "তেল", icon: "🛢️" },
  { slug: "sobji", name: "সবজি", icon: "🥦" },
  { slug: "mach", name: "মাছ", icon: "🐟" },
  { slug: "mangsho", name: "মাংস", icon: "🥩" },
  { slug: "dim-dui", name: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", name: "মশলা", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const displayName = user?.name ? user.name.split(" ")[0] : "";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100/60 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Bar: Brand, Date, Auth Controls */}
        <div className="flex items-center justify-between py-3">
          {/* Logo & Dynamic Bangla Date */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#09793c] flex items-center justify-center p-2 shadow-xs shrink-0">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={26}
                height={26}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-1">
                বাজার দর
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                <BanglaDate />
              </p>
            </div>
          </Link>

          {/* Right: Auth buttons or User Profile Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100/80 transition cursor-pointer"
                  aria-expanded={dropdownOpen}
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-emerald-500 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden sm:inline-block text-xs font-semibold text-gray-800">
                    {displayName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown Menu matching Image 1 */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="mb-4">
                      <p className="text-base font-bold text-gray-900 leading-snug">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400 font-normal mt-0.5 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="space-y-3 pt-1">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 text-sm font-medium text-gray-800 hover:text-emerald-700 transition"
                      >
                        <UserIcon className="w-4 h-4 text-slate-500 fill-slate-500 shrink-0" />
                        <span>আমার প্রোফাইল</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2.5 text-sm font-medium text-[#d03739] hover:opacity-80 transition text-left cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 text-[#d03739] shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 14L4 9l5-5" />
                          <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
                        </svg>
                        <span>সাইন আউট</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5 sm:gap-3">
                <Link
                  href="/signin"
                  className="px-2 py-1 text-xs sm:text-sm font-semibold text-gray-800 hover:text-emerald-700 transition"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#09793c] hover:bg-[#076833] rounded-lg shadow-xs transition"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Second Row: Category Navigation Links matching Image 1 layout */}
        <nav
          className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-4 py-2 overflow-x-auto no-scrollbar scroll-smooth"
          aria-label="Category Navigation"
        >
          {CATEGORIES.map((cat) => {
            const isActive = pathname === `/categories/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-gray-700 hover:text-emerald-700 hover:bg-gray-100/70"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Third Row: Price Ticker across all pages */}
      <PriceTicker />
    </header>
  );
}
