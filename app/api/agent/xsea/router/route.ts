import { NextRequest, NextResponse } from "next/server";
import { openrouterGenerate } from "../model";
import { querySearch } from "@/app/api/object/xsea/global/route";
import { XSeaObject } from "@/app/components/xsea/xseaa";

export async function POST(request: NextRequest) {
  const actions = [
    "肯定",
    "否定",
    "终止",
    "陈述",
    "创建",
    "查询",
    "询问",
    "修改",
    "执行",
    "其他",
  ];
  const entities = ["产品", "脚本", "计划", "压测", "记录", "概念", "其他"];
  try {
    const json = await request.json();
    // json.question = "";
    const jsonText = JSON.stringify(json, null, 2);
    const [result, objects] = await Promise.all([
      openrouterGenerate([
        {
          role: "system",
          content: `
你是一个精确的意图分类器，用户会向你发送如下格式的JSON：
{
  "scene": "xxx",
  "question": "xxx",
  "answer": "xxx"
}

- scene: 代表当前已存在的对话场景
- question: 代表对话中助手的问题
- answer: 代表对话中用户的回答

你需要从以下两个维度把用户回答的意图分类到对应编号：

【行为】有如下分类编号
1. 肯定 - 用户表示同意、接受、确认
2. 否定 - 用户表示拒绝、不同意、否认
3. 退出|放弃 - 用户明确表示想完全结束当前对话或放弃整个任务，没有新的请求
4. 陈述 - 用户在描述情况、提供信息、阐述需求，但没有明确行动请求
5. 新建 - 用户明确表示想创建新的内容
6. 查看|选择|绑定|更换 - 用户明确请求获取列表、查询或切换已有内容
7. 询问 - 用户在提问、寻求解释或澄清
8. 修改|优化 - 用户想改进或调整现有内容
9. 执行|开始 - 用户明确表示想立即启动或运行某个操作
10. 其他 - 不属于以上分类的行为

【实体】有如下分类编号
1. 产品 - 与产品相关
2. 脚本|JMeter|Gatling|Shell - 与脚本工具或脚本内容相关
3. 计划|测试计划 - 与测试计划相关
4. 目标|压测|测试|压测场景|流量 - 与测试目标、压测执行相关
5. 记录|压测结果 - 与测试结果、数据记录相关
6. 压测相关概念|测试相关概念|脚本相关概念|XSea相关概念 - 与技术概念相关
7. 其他 - 不属于以上分类的实体

场景与意图判断的关键规则：

1. 严格区分描述需求和执行操作：
   - 在"创建脚本"场景中，描述测试参数（如"模拟222个用户访问百度"）是陈述[4,2]
   - 只有当用户明确要求立即执行（如"现在开始测试"、"运行压测"）时才是执行[9,4]
   - 描述测试场景不等于请求执行测试

2. 根据场景正确理解实体：
   - 在"创建脚本"场景中提及压测参数，实体通常是脚本[2]而非压测[4]
   - 只有在用户明确要执行压测时，实体才是压测[4]
   - 描述脚本行为（如流量模拟）的实体是脚本[2]

3. 退出与转换场景的区别：
   - 退出[3]指用户想完全结束任务或对话，没有新的请求
   - 当用户放弃当前场景但同时提出新请求时，应以新请求为准
   - "算了"+"新请求"的组合应分类为新请求的意图，而非退出[3]

4. 用户直接回应问题与主动发起请求的区分：
   - 当助手询问细节，用户提供所需信息时，这是陈述[4]而非执行[9]
   - 只有当用户明确表示"开始"、"启动"、"执行"等才分类为执行[9]
   - 描述需求（如"模拟X个用户"）不等于请求执行

错误示例详解：
- "模拟 222个用户访问百度10分钟" 在创建脚本场景中是描述脚本需求[4,2]，不是执行压测[9,4]
- "算了，我们创建一个产品吧" 是转换到创建产品[5,1]，不是退出[3,1]
- "jmeter吧"作为对"请确认您需要的脚本类型"的回答，是陈述[4,2]，不是查询[6,2]
- "开始压测" 是明确的执行请求[9,4]，这才是真正的执行操作
- "需要脚本测试登录功能，并发100" 是描述脚本需求[4,2]，不是执行
- "10分钟内执行1000次GET请求" 是描述脚本参数[4,2]，不是执行指令

输出格式要求：
- 仅输出[行为编号,实体编号]格式
- 必须以"["开头，以"]"结尾
- 总字符数不超过8个字符
- 不包含任何汉字、中文或非ASCII字符
- 不包含解释、说明或额外信息

确保回答严格遵循以上格式，不添加任何解释或额外内容。
        `.trim(),
        },
        { role: "user", content: jsonText },
      ]),
      querySearch(json.answer),
    ]);
    const response = result.text as string;
    let actionIndex = actions.length;
    let entityIndex = entities.length;
    try {
      [actionIndex, entityIndex] = JSON.parse(response);
    } catch (error) {
      console.log(error, result.text);
      actionIndex =
        actions.findIndex((action) => response.includes(`[${action}`)) + 1;
      entityIndex =
        entities.findIndex((entity) => response.includes(`${entity}]`)) + 1;
    }
    const action = actions[actionIndex - 1] ?? "其他";
    const entity = entities[entityIndex - 1] ?? "其他";

    const list = (objects.list ?? []) as XSeaObject[];
    if (entity === "脚本") {
      objects.list = list.filter((item) => item.type === "SCRIPT");
    }
    if (entity === "压测") {
      objects.list = list.filter((item) => item.type === "GOAL");
    }
    // if (entity === "产品") {
    //   objects.list = list.filter((item) => item.type === "PRODUCT");
    // }
    // if (entity === "计划") {
    //   objects.list = list.filter((item) => item.type === "PLAN");
    // }
    // if (entity === "记录") {
    //   objects.list = list.filter((item) => item.type === "RECORD");
    // }
    // if (entity === "报告") {
    //   objects.list = list.filter((item) => item.type === "REPORT");
    // }

    return NextResponse.json(
      {
        action,
        entity,
        intention: action + entity,
        request: json,
        response,
        objects,
      },
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
