import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

export async function GET(req: NextRequest) {
  try {
    return await handler.GET(req);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal auth error";
    console.error("[BetterAuth GET Error]:", error);
    return NextResponse.json(
      { error: msg, code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handler.POST(req);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal auth error";
    console.error("[BetterAuth POST Error]:", error);
    return NextResponse.json(
      { error: msg, code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
