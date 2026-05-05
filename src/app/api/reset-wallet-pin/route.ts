import { NextRequest, NextResponse } from "next/server";

/**
 * Public reset via email token (no user session).
 * Backend: POST {NEXT_PUBLIC_BASE_URL}/user/reset_pin/ with { token, new_pin }
 * (same origin pattern as other routes; BASE_URL should include /v1 if required.)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = body?.token as string | undefined;
    const new_pin = body?.new_pin as string | undefined;

    if (!token || typeof token !== "string" || !new_pin || typeof new_pin !== "string") {
      return NextResponse.json(
        { status: "failed", message: "Token and new PIN are required." },
        { status: 400 },
      );
    }

    const cacheBuster = `cache=${Date.now()}`;
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    if (!base) {
      return NextResponse.json(
        { status: "failed", message: "Server configuration error." },
        { status: 500 },
      );
    }

    const res = await fetch(`${base}/user/reset_pin/?${cacheBuster}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, new_pin }),
    });

    const data = await res.json().catch(() => ({}));

    return NextResponse.json(
      {
        status: res.ok ? "success" : "failed",
        message: (data as { message?: string })?.message,
        data,
      },
      { status: res.status },
    );
  } catch (e) {
    console.error("reset-wallet-pin:", e);
    return NextResponse.json(
      { status: "failed", message: "Something went wrong. Try again later." },
      { status: 500 },
    );
  }
}
