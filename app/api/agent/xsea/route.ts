import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: any }) {
  return NextResponse.json(
    { message: "你好，世界" },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
