import http from "@/app/api/simplifier/http";
import { NextRequest, NextResponse } from "next/server";
import nodejieba from "nodejieba";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") ?? "";
    const tokens = nodejieba.tag(query);
    const words = tokens
      .filter(
        (tag) =>
          ![
            "uj", // 助词
            "f", // 方位词
            "x", // 标点符号
            "r", // 代词
            "v", // 动词
            "o", // 拟声词
            "y", // 语气词
            "c", // 连词
            "p", // 介词
            "u", // 助词
            "xc", // 其他虚词
            "w", // 标点符号
            "d", // 副词
            // "m",   // 数词
            // "q",   // 量词
            // "t",   // 时间词
            // "tg",  // 时语素
            "e", // 叹词
            "z", // 状态词
            "ul", // 助词
            // "mg",  // 数语素
            "ud", // 结构助词
            // "ug",  // 时态助词
            "uv", // 动词后缀
            "uz", // 状态词尾
          ].includes(tag.tag),
      )
      .map((tag) => tag.word.toLowerCase());
    const [scriptRes, goalRes] = await Promise.all([
      http.post(`http://10.10.30.103:8081/api/xsea/script/queryScriptRel`),
      http.post(`http://10.10.30.103:8081/api/xsea/plan/goal/queryGoalRel`),
    ]);
    const scriptList: any[] = (scriptRes.data.object ?? []).map(
      (item: any) => ({
        type: "SCRIPT",
        ...item,
      }),
    );
    const goalList: any[] = (goalRes.data.object ?? []).map((item: any) => ({
      type: "GOAL",
      ...item,
    }));
    const allList = [...scriptList, ...goalList].map((item) => {
      const allValueText = Object.keys(item)
        .filter((key) => key.toLowerCase().includes("name"))
        .map((key) => item[key])
        .filter((value) => value != null)
        .map((value) => value.toString().trim().toLowerCase())
        .join(",");
      const score = words.filter((word) => allValueText.includes(word)).length;
      return { ...item, score };
    });
    allList.sort((a, b) => b.score - a.score);

    return NextResponse.json(
      {
        query,
        tokens,
        words,
        list: allList,
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
