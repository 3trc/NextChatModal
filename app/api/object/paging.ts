import { NextRequest, NextResponse } from "next/server";

export function pagingParams(request: NextRequest) {
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

export function pagingFactory(paging: (params: any, searchParams: any) => any) {
  return async (request: NextRequest, { params }: { params: any }) => {
    try {
      const searchParams = pagingParams(request);
      return NextResponse.json(await paging(params, searchParams), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return NextResponse.json(
        {
          code: 500,
          message: "Internal Server Error",
        },
        { status: 500 },
      );
    }
  };
}
