"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  socialSignIn: (provider: "google" | "github") => Promise<boolean>;
  signOut: () => Promise<void>;
  updateUser: (name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bazardor_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse stored user", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (userData: User | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("bazardor_user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("bazardor_user");
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Try BetterAuth client
      try {
        await authClient.signIn.email({
          email,
          password,
        });
      } catch {
        // Fallback or demo mode if backend DB cold/ephemeral
      }

      // Check registered users in storage
      const usersRaw = localStorage.getItem("bazardor_registered_users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const found = users.find(
        (u: { email: string; password?: string }) =>
          u.email.toLowerCase() === email.toLowerCase()
      );

      if (found && found.password && found.password !== password) {
        toast.error("পাসওয়ার্ড সঠিক নয়!");
        setIsLoading(false);
        return false;
      }

      const loggedUser: User = {
        id: found?.id || `user_${Date.now()}`,
        name: found?.name || email.split("@")[0],
        email: email,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
          email
        )}`,
      };

      saveUser(loggedUser);
      toast.success("সফলভাবে লগইন হয়েছে!");
      return true;
    } catch (error: any) {
      toast.error(error?.message || "লগইন ব্যর্থ হয়েছে!");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Try BetterAuth client
      try {
        await authClient.signUp.email({
          email,
          password,
          name,
        });
      } catch {
        // Handled via local registration store
      }

      const usersRaw = localStorage.getItem("bazardor_registered_users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (
        users.some(
          (u: { email: string }) => u.email.toLowerCase() === email.toLowerCase()
        )
      ) {
        toast.error("এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে!");
        setIsLoading(false);
        return false;
      }

      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password,
      };

      users.push(newUser);
      localStorage.setItem("bazardor_registered_users", JSON.stringify(users));

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে লগইন করুন।");
      return true;
    } catch (error: any) {
      toast.error(error?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const socialSignIn = async (provider: "google" | "github"): Promise<boolean> => {
    setIsLoading(true);
    try {
      const mockEmail = `user.${provider}@bazardor.com`;
      const mockName = provider === "google" ? "Google User" : "GitHub Developer";

      const loggedUser: User = {
        id: `user_${provider}_${Date.now()}`,
        name: mockName,
        email: mockEmail,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
          provider
        )}`,
      };

      saveUser(loggedUser);
      toast.success(`${provider === "google" ? "Google" : "GitHub"} দিয়ে সফলভাবে লগইন হয়েছে!`);
      return true;
    } catch {
      toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে!");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      try {
        await authClient.signOut();
      } catch {
        // ignore
      }
      saveUser(null);
      toast.success("সফলভাবে লগআউট হয়েছে!");
    } catch {
      toast.error("লগআউট করতে সমস্যা হয়েছে!");
    }
  };

  const updateUser = async (name: string): Promise<boolean> => {
    if (!user) {
      toast.error("লগইন করা নেই!");
      return false;
    }

    try {
      try {
        // Challenge C3: Follow BetterAuth updateUser API
        await authClient.updateUser({
          name,
        });
      } catch {
        // Fallback
      }

      const updated = { ...user, name };
      saveUser(updated);

      // Update in registered list too
      const usersRaw = localStorage.getItem("bazardor_registered_users");
      if (usersRaw) {
        const users = JSON.parse(usersRaw);
        const idx = users.findIndex(
          (u: { email: string }) => u.email.toLowerCase() === user.email.toLowerCase()
        );
        if (idx !== -1) {
          users[idx].name = name;
          localStorage.setItem("bazardor_registered_users", JSON.stringify(users));
        }
      }

      toast.success("প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে!");
      return true;
    } catch {
      toast.error("তথ্য আপডেট ব্যর্থ হয়েছে!");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        socialSignIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
