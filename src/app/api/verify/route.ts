import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_IP_ADDRESS}:3000/api/users/${data.id}`
  );
  const { success, user } = await res.json();
  if (success) return NextResponse.json({ success: true, data: user });
  else return NextResponse.json({ success: false, error: "No exist id" });
}
