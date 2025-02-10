import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      {
        message: "你好，世界",
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        code: 500,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
