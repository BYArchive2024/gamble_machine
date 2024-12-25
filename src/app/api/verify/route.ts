import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_IP_ADDRESS}:3000/api/users/${data.id}`
  );
  const { success, user } = await res.json();
  if (!success)
    return NextResponse.json({ success: false, error: "No exist id" });
  const response = NextResponse.json({ success: true, data: user });

  response.cookies.set({
    name: "id",
    value: user.id,
    secure: true,
  });

  response.cookies.set({
    name: "usr_name",
    value: user.name,
    secure: true,
  });

  response.cookies.set({
    name: "balance",
    value: user.balance,
    secure: true,
  });

  return response;
}
