import http from "@/app/api/simplifier/http";
import { NextRequest, NextResponse } from "next/server";
import nodejieba from "nodejieba";

export const querySearch = async (querys: string[], limit = 50) => {
  // 切分查询
  querys = querys
    .map((query) => query.toLowerCase().trim())
    .filter((query) => query);
  // 从每一个查询中提取关键词
  const wordsList = querys
    .map((query) => nodejieba.extract(query, 10))
    .map((words) =>
      words.filter((word) => !["压测", "执行", "开始"].includes(word.word)),
    );
  // 执行数据获取
  const [scriptRes, goalRes] = await Promise.all([
    http.post(`http://10.10.30.103:8081/api/xsea/script/queryScriptRel`),
    http.post(`http://10.10.30.103:8081/api/xsea/plan/goal/queryGoalRel`),
  ]);
  const scriptList: any[] = (scriptRes.data.object ?? []).map((item: any) => ({
    ...item,
    type: "SCRIPT",
    _name: "脚本",
  }));
  const goalList: any[] = (goalRes.data.object ?? []).map((item: any) => ({
    ...item,
    type: "GOAL",
    _name: "目标",
  }));
  const allList = [...scriptList, ...goalList]
    .map((item) => {
      const allValueText = Object.keys(item)
        .filter((key) => key.toLowerCase().includes("name"))
        .map((key) => item[key])
        .filter((value) => value != null)
        .map((value) => value.toString().trim().toLowerCase())
        .join(",");
      let score = 0;
      querys.forEach((query, index) => {
        wordsList[index].forEach((word) => {
          if (allValueText.includes(word.word)) {
            score += word.weight;
          }
        });
      });
      return { ...item, score };
    })
    .filter((item) => item.score > 0);
  allList.sort((a, b) => b.score - a.score);
  // const resultList: any[] = [];
  // while (
  //   allList.length !== 0 &&
  //   (resultList.length === 0 ||
  //     allList[0].score === resultList[resultList.length - 1].score)
  // ) {
  //   resultList.push(allList.shift());
  // }
  // resultList.splice(limit, Infinity);
  return { list: allList, wordsList };
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || "";
    const limit = Number(searchParams.get("limit") || "10");
    const showWords = !!searchParams.get("words");
    const { list, wordsList } = await querySearch(query.split("|"), limit);
    return NextResponse.json(
      {
        query,
        ...(showWords ? { wordsList } : {}),
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
