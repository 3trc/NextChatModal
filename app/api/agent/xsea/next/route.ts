import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const messages = await request.json();
    const res = await axios.post(`http://localhost:4111/api/agents/XSea推荐询问/generate`, {
      messages,
    });
    const jsonText = ((res.data.text ?? "[]") as string).replace('```json', '').replace('```', '');
    console.log(1234, jsonText);
    const result = JSON.parse(jsonText);
    return NextResponse.json(
      result,
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        code: 500,
        message: error.message || "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
