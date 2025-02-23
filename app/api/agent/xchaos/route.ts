import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const res = await axios.post(
      `http://10.10.224.24:8089/api/xchaos/taskinstance/executeTask`,
      {
        taskId: "1887384229074038786",
        ignore: false,
      },
      {
        headers: {
          cookie:
            "sys_token=cb1d35c85f9b4f47acf46785051ec2dd; sys_env_id=977046101482688512; sys_env_code=AI_DEMO",
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
