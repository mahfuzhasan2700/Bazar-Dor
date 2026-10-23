"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email || !password) {
      toast.error("অনুগ্রহ করে সব তথ্য পূরণ করুন!");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await signUp.email({
        name: name.trim(),
        email,
        password,
      });

      if (res?.error) {
        toast.error(res.error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
      } else {
        toast.success("রেজিস্ট্রেশন সফল হয়েছে! এবার লগইন করুন। 🎉");
        router.push("/signin");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "রেজিস্ট্রেশন ব্যর্থ হয়েছে!";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocial = async (provider: "google" | "github") => {
    setSocialLoading(provider);
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "সোশ্যাল লগইন ব্যর্থ হয়েছে!";
      toast.error(msg);
      setSocialLoading(null);
    }
  };

  return (
    <div className="w-full max-w-[430px] mx-auto py-10 sm:py-16 px-4">
      <div className="text-center mb-6 sm:mb-8 space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          রেজিস্ট্রেশন করুন
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          নতুন অ্যাকাউন্ট তৈরি করে বাজার দরের সাথে যুক্ত থাকুন।
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-5">
        {/* Social Sign Up Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            disabled={socialLoading !== null}
            onClick={() => handleSocial("google")}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold transition cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>
              {socialLoading === "google" ? "গুগলে রিডাইরেক্ট হচ্ছে..." : "Google দিয়ে রেজিস্ট্রেশন"}
            </span>
          </button>

          <button
            type="button"
            disabled={socialLoading !== null}
            onClick={() => handleSocial("github")}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold transition cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 fill-current text-gray-900" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>
              {socialLoading === "github" ? "গিটহাবে রিডাইরেক্ট হচ্ছে..." : "GitHub দিয়ে রেজিস্ট্রেশন"}
            </span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-[11px] text-gray-400 absolute uppercase">
            অথবা ইমেইল দিয়ে
          </span>
        </div>

        {/* Name, Email, Password Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1"
            >
              নাম (Full Name)
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পূর্ণ নাম"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1"
            >
              ইমেইল (Email)
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1"
            >
              পাসওয়ার্ড (Password)
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-[#09793c] hover:bg-[#076833] disabled:opacity-50 text-white font-semibold text-sm transition shadow-xs cursor-pointer"
          >
            {isSubmitting ? "রেজিস্ট্রেশন হচ্ছে..." : "সাইন আপ"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 pt-1">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-bold text-[#09793c] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
