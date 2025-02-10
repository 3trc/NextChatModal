import { NextRequest, NextResponse } from "next/server";
import model from "./model";

export async function GET(request: NextRequest, { params }: { params: any }) {
  const stream = await model.stream([{ role: "user", content: "你好" }]);
  for await (const chunk of stream) {
    console.log(chunk);
  }
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
