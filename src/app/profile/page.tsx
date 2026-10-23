"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে আগে লগইন করুন!");
      router.push("/signin?callbackUrl=/profile");
    } else if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম ফাঁকা রাখা যাবে না!");
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "আপডেট ব্যর্থ!");
      } else {
        toast.success("প্রোফাইল আপডেট হয়েছে! 🎉");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "আপডেট ব্যর্থ!";
      toast.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      {/* Page Title & Subtitle matching Profile.png */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Card 1: User Identity & Sign Out matching Profile.png */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-2xl shrink-0">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-snug">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 font-normal mt-0.5">
              {user.email}
            </p>
          </div>
        </div>

        {/* Sign Out Button matching Profile.png */}
        <button
          type="button"
          onClick={handleSignOut}
          className="border border-[#d03739] text-[#d03739] hover:bg-rose-50 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition cursor-pointer"
        >
          <span>↩</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      {/* Card 2: তথ্য ও আপডেট ফর্ম matching Profile.png */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-gray-900">
          তথ্য
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="text-sm text-gray-700 font-medium mb-1.5 block"
            >
              নাম
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#09793c] transition"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-[#09793c] hover:bg-[#076833] disabled:opacity-50 text-white py-3 rounded-xl font-medium text-sm transition cursor-pointer"
          >
            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}
