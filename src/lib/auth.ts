import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";
import os from "os";

// In serverless environments like Vercel, write to temp dir
const dbPath =
  process.env.NODE_ENV === "production"
    ? path.join(os.tmpdir(), "auth.db")
    : "auth.db";

const db = new Database(dbPath);

// Ensure all BetterAuth core tables exist automatically
db.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    emailVerified INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
  );
  CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    expiresAt DATETIME NOT NULL,
    token TEXT UNIQUE NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    ipAddress TEXT,
    userAgent TEXT,
    userId TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY,
    accountId TEXT NOT NULL,
    providerId TEXT NOT NULL,
    userId TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    accessToken TEXT,
    refreshToken TEXT,
    idToken TEXT,
    accessTokenExpiresAt DATETIME,
    refreshTokenExpiresAt DATETIME,
    scope TEXT,
    password TEXT,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
  );
  CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expiresAt DATETIME NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
  );
`);

const getBaseURL = () => {
  if (process.env.NODE_ENV === "production") {
    if (process.env.BETTER_AUTH_URL && !process.env.BETTER_AUTH_URL.includes("localhost")) {
      return process.env.BETTER_AUTH_URL;
    }
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return process.env.URL || "https://bazar-dor-perseus11.vercel.app";
  }
  return process.env.BETTER_AUTH_URL || "http://localhost:3000";
};

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "bazar_dor_default_secure_secret_key_2026",
  database: db,
  baseURL: getBaseURL(),
  trustedOrigins: [
    "https://bazar-dor-perseus11.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ],
  rateLimit: {
    enabled: false,
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "github_placeholder_id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "github_placeholder_secret",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "google_placeholder_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "google_placeholder_secret",
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
  },
});
