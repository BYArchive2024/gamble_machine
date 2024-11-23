import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_IP_ADDRESS}:3000/api/users`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  const { success } = await res.json();
  if (success) return NextResponse.json({ success: true });
}
