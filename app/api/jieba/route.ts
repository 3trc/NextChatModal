import { NextRequest, NextResponse } from "next/server";
import nodejieba from "nodejieba";

export async function GET(request: NextRequest) {
  try {
    const text =
      "XSea之中，所以，😄，你知道怎么安装探针吗，你这个小丑，回答我把，哈哈哈";
    const tags = nodejieba
      .tag(text)
      .filter((tag) => ["n", "eng"].includes(tag.tag))
      .map((tag) => tag.word);
    return NextResponse.json(
      {
        result: tags,
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
