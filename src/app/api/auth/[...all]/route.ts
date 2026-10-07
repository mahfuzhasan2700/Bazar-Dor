import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

export async function GET(req: NextRequest) {
  try {
    return await handler.GET(req);
  } catch (error: any) {
    console.error("[BetterAuth GET Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Internal auth error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handler.POST(req);
  } catch (error: any) {
    console.error("[BetterAuth POST Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Internal auth error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

