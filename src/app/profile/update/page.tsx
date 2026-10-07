"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { user, isLoading, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("তথ্য পরিবর্তন করতে আগে লগইন করুন!");
      router.push("/signin?redirect=/profile/update");
    } else if (user) {
      setName(user.name);
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম ফাঁকা রাখা যাবে না!");
      return;
    }

    setIsUpdating(true);
    const success = await updateUser(name.trim());
    setIsUpdating(false);

    if (success) {
      router.push("/profile");
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-gray-500 font-medium">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-700 hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            তথ্য আপডেট করুন
          </h1>
        </div>

        <p className="text-xs text-gray-500">
          আপনার প্রোফাইলের নাম পরিবর্তন করতে নিচের ঘরে নতুন নাম লিখে আপডেট করুন।
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="update-name"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              নাম (Name)
            </label>
            <input
              id="update-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পূর্ণ নাম"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-sm transition shadow-sm cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isUpdating ? "আপডেট হচ্ছে..." : "Update Information"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
