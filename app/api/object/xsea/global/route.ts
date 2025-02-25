import http from "@/app/api/simplifier/http";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") ?? "";
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

    return NextResponse.json(
      {
        query,
        list: scriptList.concat(goalList),
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
