import { NextRequest, NextResponse } from "next/server";
import nodejieba from "nodejieba";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        tags: nodejieba.tag("怎么安装探针"),
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
