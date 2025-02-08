import XSeaSimplifier from "@/app/api/simplifier/xseaSimplifier";
import { NextRequest, NextResponse } from "next/server";

function pagingParams(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.has("search") ? searchParams.get("search")! : "";
  const pageNum = searchParams.has("pageNum")
    ? Number(searchParams.get("pageNum"))
    : 1;
  const pageSize = searchParams.has("pageSize")
    ? Number(searchParams.get("pageSize"))
    : 10;
  return { search, pageNum, pageSize };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } },
) {
  try {
    const pgParams = pagingParams(request);
    const xsea = new XSeaSimplifier();
    return NextResponse.json(
      await xsea.PlanPaging(
        params.productId,
        pgParams.pageNum,
        pgParams.pageSize,
        pgParams.search,
      ),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
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
