import { NextResponse } from "next/server";
import XSeaSimplifier from "../simplifier/xseaSimplifier";

export async function GET() {
  try {
    const xsea = new XSeaSimplifier();
    return NextResponse.json(await xsea.PlanPaging("915184367784673280"), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
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
