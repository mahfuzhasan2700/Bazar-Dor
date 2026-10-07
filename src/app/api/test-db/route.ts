import { NextResponse } from "next/server";

export async function GET() {
  const info: any = {
    env: process.env.NODE_ENV,
    betterAuthUrl: process.env.BETTER_AUTH_URL,
    hasGithubId: !!process.env.GITHUB_CLIENT_ID,
    hasGoogleId: !!process.env.GOOGLE_CLIENT_ID,
  };

  try {
    const os = await import("os");
    info.tmpdir = os.tmpdir();
  } catch (e: any) {
    info.osError = e.message;
  }

  try {
    const Database = (await import("better-sqlite3")).default;
    info.betterSqliteImport = "success";
    const db = new Database(":memory:");
    info.sqliteMemory = "success";
  } catch (e: any) {
    info.betterSqliteError = e.message;
    info.betterSqliteStack = e.stack;
  }

  try {
    const { auth } = await import("@/lib/auth");
    info.authImport = "success";
    info.hasAuth = !!auth;
  } catch (e: any) {
    info.authError = e.message;
    info.authStack = e.stack;
  }

  return NextResponse.json(info);
}
