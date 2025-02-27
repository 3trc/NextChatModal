import http from "@/app/api/simplifier/http";
import { NextRequest, NextResponse } from "next/server";
import nodejieba from "nodejieba";

export const querySearch = async (querys: string[], limit = 50) => {
  querys = querys
    .map((query) => query.toLowerCase().trim())
    .filter((query) => query);
  const words = nodejieba.extract(querys.join("|"), 12);
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
  const allList = [
    ...scriptList.map((item) => ({ ...item, _name: "脚本" })),
    ...goalList.map((item) => ({ ...item, _name: "目标" })),
  ]
    .map((item) => {
      const allValueText = Object.keys(item)
        .filter((key) => key.toLowerCase().includes("name"))
        .map((key) => item[key])
        .filter((value) => value != null)
        .map((value) => value.toString().trim().toLowerCase())
        .join(",");
      let score = 0;
      querys.forEach((query, index) => {
        const attention = (index + 1) * 2;
        words.forEach((word) => {
          if (allValueText.includes(word.word)) {
            score += word.weight;
          }
        });
        if (allValueText.includes(query)) {
          score *= 1.2;
        }
        score *= attention;
      });
      return { ...item, score };
    })
    .filter((item) => item.score > 0);
  allList.sort((a, b) => b.score - a.score);
  const resultList: any[] = [];
  while (
    allList.length !== 0 &&
    (resultList.length === 0 ||
      allList[0].score === resultList[resultList.length - 1].score)
  ) {
    resultList.push(allList.shift());
  }
  resultList.splice(limit, Infinity);
  return { list: resultList, words };
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || "";
    const limit = Number(searchParams.get("limit") || "10");
    const showWords = !!searchParams.get("words");
    const { list, words } = await querySearch(query.split("|"), limit);
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
