import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.cookies.get("id")?.value;
  const userName = req.cookies.get("usr_name")?.value;
  const balance = req.cookies.get("balance")?.value;

  return NextResponse.json({
    user: {
      id: userId,
      name: userName,
      balance: balance,
    },
  });
}
