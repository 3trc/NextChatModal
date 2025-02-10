import { NextRequest, NextResponse } from "next/server";
import model from "../model";

export async function GET(request: NextRequest, { params }: { params: any }) {
  const actions = ["创建", "选择", "解释", "优化", "执行", "放弃", "其他"];
  const entities = ["产品", "脚本", "计划", "压测", "记录", "知识", "其他"];
  const agentsMap = {
    创建: {
      产品: "创建产品",
      脚本: "创建脚本",
      计划: "创建计划",
      压测: "创建压测",
      记录: "创建压测",
      知识: "知识库",
      其他: "知识库",
    },
    选择: {
      产品: "选择产品",
      脚本: "选择脚本",
      计划: "选择计划",
      压测: "选择目标",
      记录: "选择记录",
      知识: "知识库",
      其他: "知识库",
    },
    解释: {
      产品: "解释产品",
      脚本: "解释脚本",
      计划: "解释计划",
      压测: "解释记录",
      记录: "解释记录",
      知识: "知识库",
      其他: "知识库",
    },
    优化: {
      产品: "知识库",
      脚本: "优化脚本",
      计划: "知识库",
      压测: "解释记录",
      记录: "解释记录",
      知识: "知识库",
      其他: "知识库",
    },
    执行: {
      产品: "创建压测",
      脚本: "执行脚本",
      计划: "创建压测",
      压测: "创建压测",
      记录: "创建压测",
      知识: "知识库",
      其他: "知识库",
    },
    放弃: {
      产品: "退出",
      脚本: "退出",
      计划: "退出",
      压测: "退出",
      记录: "退出",
      知识: "退出",
      其他: "退出",
    },
    其他: {
      产品: "知识库",
      脚本: "知识库",
      计划: "知识库",
      压测: "知识库",
      记录: "知识库",
      知识: "知识库",
      其他: "知识库",
    },
  } as any;
  try {
    const searchParams = request.nextUrl.searchParams;
    const userContent = (params?.content || searchParams.get("content")) ?? "";
    const result = await model.invoke([
      {
        role: "system",
        content: `
你是用户消息的意图分类器，你需要对于用户的意图进行分类，你需要关注以下两个维度

【行为】有以下意图分类:
  1. 创建|新建|新增|追加|生成
  2. 查看|查询|列出|选择|绑定
  3. 分析|解释|疑问|排查|定位
  4. 优化|调整|修改
  5. 执行|运行|测试|调试|开始|验证
  6. 返回|重来|放弃|关闭|停止
  7. 其他

【实体】有以下领域分类:
  1.产品
  2.脚本|JMeter|Gatling|Shell
  3.计划
  4.压测|目标|测试|流量配置|并发配置|压测配置
  5.记录|压测结果
  6.知识|概念|压测相关知识或问题|测试相关知识或问题
  7.其他

接下来用户会向你发送消息，避免回答用户问题，务必输出以"["开始，以"]"结尾[行为序号,实体序号]这样的JSON格式
  比如: "我需要一个JMeter脚本用来压测百度"，你应该输出[1,2]
  比如: "现在有哪些产品？"，你应该输出[2,1]
  比如: "可以了，现在可以开始压测了"，你应该输出[5,4]
  比如: "你好，你是谁"，你应该输出[7,7]
  比如: "帮我复制这个脚本"，你应该输出[7,2]
  比如: "我朋友和我说你比较熟悉shell"，你应该输出[1,2]，(这是因为这种语境下用户一般是希望创建一个脚本)
  比如: "开始吧"，你应该输出[5,4]，(这是因为主要功能是创建压测)
  比如: "你知道什么是jmeter脚本吗？"，你应该输出[7,2]，(这是因为用户只是对于某个概念疑问而询问，并非要解释某一个具体的jmeter脚本，所以行为归类为其他)
  比如: "这个测试记录怎么看？"，你应该输出[3,5]，(这是因为这里"怎么看？"的含义不是去查看，而是去解释)
  比如: "算了"，你应该输出[6,7]
  比如: "我们回到最开始，写一个gatling吧"，你应该输出[6,2]
  比如: "我老板叫我过来执行一次压测"，你应该输出[5,4]
  比如: "怎么样才能验证一个系统的性能瓶颈"，你应该输出[3,6]，(这里因为用户只是询问知识概念，并非要进行什么操作)
请务必只输出以"["开始，以"]"结尾[行为序号,实体序号]这样的JSON格式，避免输出其他不相关的内容，避免解释
      `.trim(),
      },
      { role: "user", content: userContent },
    ]);
    const [actionIndex, entityIndex] = JSON.parse(result.content as string);
    const action = actions[actionIndex - 1] ?? "其他";
    const entity = entities[entityIndex - 1] ?? "其他";
    const intention = agentsMap[action]?.[entity] ?? "知识库";
    return NextResponse.json(
      { intention, action, entity, userContent },
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
