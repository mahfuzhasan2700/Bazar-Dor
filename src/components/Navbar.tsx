"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import BanglaDate from "@/components/BanglaDate";
import PriceTicker from "@/components/PriceTicker";
import { User as UserIcon, ChevronDown, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { Category } from "@/types";

const DEFAULT_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load categories in navbar:", err);
      });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট সফল!");
            setDropdownOpen(false);
            router.push("/");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট হতে সমস্যা হয়েছে!");
    }
  };

  const user = session?.user;
  const displayName = user?.name ? user.name.split(" ")[0] : "";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Bar: Brand, Date, Auth Controls */}
        <div className="flex items-center justify-between py-3">
          {/* Logo & Bangla Date */}
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
            {isPending ? (
              <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                  aria-expanded={dropdownOpen}
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-8 h-8 rounded-full border border-emerald-500 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="hidden sm:inline-block text-xs font-semibold text-gray-800">
                    {displayName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="mb-3 pb-2 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-700 transition"
                      >
                        <UserIcon className="w-4 h-4 text-gray-500" />
                        <span>আমার প্রোফাইল</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 text-sm font-medium text-[#d03739] hover:opacity-80 transition text-left cursor-pointer pt-1"
                      >
                        <svg
                          className="w-4 h-4 text-[#d03739]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>সাইন আউট</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#09793c] transition"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-3.5 py-1.5 rounded-lg bg-[#09793c] hover:bg-[#076833] text-white text-xs sm:text-sm font-semibold transition shadow-xs"
                >
                  সাইন আপ
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              aria-label="ক্যাটাগরি মেনু"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Second Row: Category Links Desktop */}
        <nav className="hidden lg:flex items-center gap-1 py-2 border-t border-gray-100 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#09793c] text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Category Menu Accordion */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id || cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
                    isActive
                      ? "bg-[#09793c] text-white shadow-xs"
                      : "text-gray-600 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Price Ticker Strip below Navbar */}
      <PriceTicker />
    </header>
  );
}
