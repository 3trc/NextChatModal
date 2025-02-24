import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    await axios.post(
      `http://10.10.224.24:8089/api/xchaos/taskinstance/executeTask`,
      {
        taskId: json.taskId,
        ignore: false,
      },
      {
        headers: {
          cookie:
            "sys_token=5d1cc39eada249da830c12c5e3f11978; sys_env_id=977046101482688512; sys_env_code=AI_DEMO",
          ["Content-Type"]: "application/json",
        },
      },
    );
    return NextResponse.json(
      {
        success: true,
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
