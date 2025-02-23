import { NextRequest, NextResponse } from "next/server";
import nodejieba from "nodejieba";
import QALib from "./zzk.json";

export async function GET(request: NextRequest) {
  try {
    const text = "熔断怎么配置";
    const words = nodejieba
      .tag(text)
      .filter((tag) =>
        ["n", "eng", "v"].some((type) => tag.tag.startsWith(type)),
      )
      .map((tag) => tag.word);
    const subQALib = QALib.map((qa) => ({
      ...qa,
      score: words.filter((word) => qa.q.includes(word)).length,
    }));
    subQALib.sort((a, b) => b.score - a.score);
    return NextResponse.json(
      subQALib.slice(0, 10).map((qa) => ({ q: qa.q, a: qa.a })),
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
