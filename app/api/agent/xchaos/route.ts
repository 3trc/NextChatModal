import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const { data } = await axios.post(
      `http://10.10.224.24:8089/api/xchaos/taskinstance/executeTask`,
      {
        taskId: json.taskId,
        ignore: false,
      },
      {
        headers: {
          cookie:
            'sys_token=ea68f6ea39194f2ba51538d1b0406171; sys_env_id=977046101482688512; sys_env_code=AI_DEMO; X-XSHELTER-ACCESS-TOKEN=9cf1c1b7-e9fc-4636-b0ec-3ec6ed44556c',
          ["Content-Type"]: "application/json",
        },
      },
    );
    return NextResponse.json(
      data,
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        code: 500,
        message: error.message || "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
