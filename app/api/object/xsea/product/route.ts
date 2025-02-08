import XSeaSimplifier from "@/app/api/simplifier/xseaSimplifier";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const xsea = new XSeaSimplifier();
    return NextResponse.json(await xsea.ProductPaging(), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      {
        code: 500,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
