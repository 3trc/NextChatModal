import http from "@/app/api/simplifier/http";
import { NextRequest, NextResponse } from "next/server";
import nodejieba from "nodejieba";

export const querySearch = async (query: string, limit = 1000) => {
  const words = nodejieba
    .extract(query, 5)
    .filter((word) => word.weight >= 8)
    .filter(
      (word) =>
        ![
          "产品",
          "脚本",
          "计划",
          "目标",
          "压测",
          "执行",
          "报告",
          "记录",
          "定时",
        ].includes(word.word),
    );
  const [scriptRes, goalRes] = await Promise.all([
    http.post(`http://10.10.30.103:8081/api/xsea/script/queryScriptRel`),
    http.post(`http://10.10.30.103:8081/api/xsea/plan/goal/queryGoalRel`),
  ]);
  const scriptList: any[] = (scriptRes.data.object ?? []).map((item: any) => ({
    type: "SCRIPT",
    ...item,
  }));
  const goalList: any[] = (goalRes.data.object ?? []).map((item: any) => ({
    type: "GOAL",
    ...item,
  }));
  const allList = [...scriptList, ...goalList]
    .map((item) => {
      const allValueText = Object.keys(item)
        .filter((key) => key.toLowerCase().includes("name"))
        .map((key) => item[key])
        .filter((value) => value != null)
        .map((value) => value.toString().trim().toLowerCase())
        .join(",");
      const score = words.filter((word) =>
        allValueText.includes(word.word),
      ).length;
      // 1 / allValueText.length;
      return { ...item, score };
    })
    .filter((item) => item.score > 0);
  allList.sort((a, b) => b.score - a.score);
  allList.splice(limit, Infinity);
  return { list: allList, words };
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || "";
    const limit = Number(searchParams.get("limit") || "10");
    const showWords = !!searchParams.get("words");
    const { list, words } = await querySearch(query, limit);
    return NextResponse.json(
      {
        query,
        ...(showWords ? { words } : {}),
        list,
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
