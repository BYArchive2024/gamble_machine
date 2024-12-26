import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.cookies.get("id")?.value;
  const userName = req.cookies.get("usr_name")?.value;
  const balance = req.cookies.get("balance")?.value;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_IP_ADDRESS}/api/users`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, name: userName, balance: balance }),
    }
  );
  const { success } = await res.json();

  return NextResponse.json({
    success: success,
  });
}
