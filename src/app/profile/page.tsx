"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Edit3, LogOut, User as UserIcon } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে আগে লগইন করুন!");
      router.push("/signin?callbackUrl=/profile");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-gray-500 font-medium">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  const user = session?.user;
  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট সফল!");
            router.push("/");
          },
        },
      });
    } catch {
      toast.error("সাইন আউটে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্যাবলী এখানে দেখুন।
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-emerald-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-2xl shrink-0">
              {user.name?.charAt(0).toUpperCase() || "U"}
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

        {/* Action Buttons: Challenge C3 Update Information Link + Sign Out */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
          <Link
            href="/profile/update"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#09793c] hover:bg-[#076833] text-white text-xs sm:text-sm font-semibold transition shadow-xs cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য আপডেট করুন</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#d03739] text-[#d03739] hover:bg-red-50 text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>সাইন আউট</span>
          </button>
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-emerald-700" />
          <span>অ্যাকাউন্ট বিবরণী</span>
        </h3>

        <div className="divide-y divide-gray-100 text-xs sm:text-sm">
          <div className="py-2.5 flex justify-between">
            <span className="text-gray-500">নাম</span>
            <span className="font-semibold text-gray-800">{user.name}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-gray-500">ইমেইল</span>
            <span className="font-semibold text-gray-800">{user.email}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-gray-500">অ্যাকাউন্ট স্ট্যাটাস</span>
            <span className="font-semibold text-emerald-700">সক্রিয়</span>
          </div>
        </div>
      </div>
    </div>
  );
}
