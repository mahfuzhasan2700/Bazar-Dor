"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, signOut, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে আগে লগইন করুন!");
      router.push("/signin?redirect=/profile");
    } else if (user) {
      setName(user.name);
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-gray-500 font-medium">লোড হচ্ছে...</p>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম ফাঁকা রাখা যাবে না!");
      return;
    }

    setIsUpdating(true);
    await updateUser(name.trim());
    setIsUpdating(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      {/* Header outside Card matching Image 2 */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Card 1: User Profile Card matching Image 2 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-2xl shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-snug">
              {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
              {user.email}
            </p>
          </div>
        </div>

        {/* Sign Out Button matching Image 2 */}
        <button
          type="button"
          onClick={() => signOut()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#d03739] text-[#d03739] hover:bg-red-50 text-xs sm:text-sm font-semibold transition cursor-pointer shrink-0"
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

      {/* Card 2: Information Form matching Image 2 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900">তথ্য</h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5"
            >
              নাম
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="আপনার নাম"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#09793c]/20 focus:border-[#09793c] transition bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full py-2.5 rounded-lg bg-[#09793c] hover:bg-[#076833] active:bg-[#065b2c] disabled:opacity-50 text-white font-semibold text-sm transition shadow-xs cursor-pointer"
          >
            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}
