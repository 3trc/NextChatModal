import { NextResponse } from "next/server";
import axios from "axios";

const http = axios.create({
  baseURL: "http://10.10.30.103:8081/api",
  headers: {
    cookie: "sys_token=d06370ee777f44a3889c81ab4c4321a8",
  },
});

async function xsea_product_page(pageNum = 1, pageSize = 10, search = "") {
  const res = await http.post(`xsea/workspace/list`, {
    pageNum: 1,
    pageSize: 10,
    condition: { name: search },
  });
  const data = res.data.object ?? {};
  return {
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    list: (data.list ?? []).map((item: any) => ({
      id: item.id,
      name: item.name,
    })),
  };
}

export async function GET() {
  try {
    return NextResponse.json(await xsea_product_page(), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
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
