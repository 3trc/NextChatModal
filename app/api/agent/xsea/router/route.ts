import { NextRequest, NextResponse } from "next/server";
import { openrouterGenerate } from "../model";

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
    const result = await openrouterGenerate([
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
3. 退出|放弃 - 用户明确表示想结束当前对话或任务
4. 陈述 - 用户在描述情况、提供信息、阐述需求，但没有明确行动请求
5. 新建 - 用户明确表示想创建新的内容
6. 查看|选择|绑定|更换 - 用户明确请求获取列表、查询或切换已有内容
7. 询问 - 用户在提问、寻求解释或澄清
8. 修改|优化 - 用户想改进或调整现有内容
9. 执行|开始 - 用户明确表示想启动或运行某个操作
10. 其他 - 不属于以上分类的行为

【实体】有如下分类编号
1. 产品 - 与产品相关
2. 脚本|JMeter|Gatling|Shell - 与脚本工具或脚本内容相关
3. 计划|测试计划 - 与测试计划相关
4. 目标|压测|测试|压测场景|流量 - 与测试目标、压测执行相关
5. 记录|压测结果 - 与测试结果、数据记录相关
6. 压测相关概念|测试相关概念|脚本相关概念|XSea相关概念 - 与技术概念相关
7. 其他 - 不属于以上分类的实体

关键区分规则：
1. 用户直接回应问题时的分类：
   - 当助手询问选择项，用户回答选项（如"jmeter吧"）时，这是陈述[4]而非查询[6]
   - 只有当用户主动发起请求（如"列出所有脚本"、"查看jmeter脚本"）时才是查询[6]
   - 一般性的简短回答（如单个词"jmeter"）通常是陈述[4]，除非上下文明确表明是查询

2. 场景连续性判断：
   - 默认假设用户在继续当前scene的对话流程
   - 当用户回答符合助手提问的预期，应视为继续当前场景
   - 只有当用户明确转向新话题或打断流程时，才算打破当前场景

3. 分类优先级细则：
   - 退出意图(3)优先级最高
   - 明确的行动指令(5,6,8,9)优先于状态表达(1,2,4)
   - 询问(7)优先于简单肯定/否定(1,2)
   - 单词回答需仔细判断上下文：
     * 如"jmeter"在回答"您需要什么类型的脚本"时是陈述[4,2]
     * 如"jmeter"在回答"您需要了解什么"时可能是询问[7,6]

错误示例详解：
- "jmeter吧"作为对"请确认您需要的脚本类型"的回答，是陈述[4,2]，不是查询脚本[6,2]
- "什么是Jmeter" 是询问概念[7,6]，不是陈述
- "我不喜欢这样，jmeter是一个不是很好的脚本引擎" 是否定概念[2,6]，不是修改脚本
- "列出脚本" 是主动请求查看[6,2]，这才是真正的查询操作
- "给我鸡毛的产品" 是查询/选择产品[6,1]，表示主动请求获取
- "开始压测" 是执行测试[9,4]，表示具体行动指令
- "模拟 13000个用户同时访问 http://xxx" 是陈述脚本需求[4,2]，在创建脚本场景中提供信息

输出格式要求：
- 仅输出[行为编号,实体编号]格式
- 必须以"["开头，以"]"结尾
- 总字符数不超过8个字符
- 不包含任何汉字、中文或非ASCII字符
- 不包含解释、说明或额外信息

确保你的回答严格遵循以上格式要求，不添加任何解释或额外内容。
      `.trim(),
      },
      { role: "user", content: jsonText },
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
    return NextResponse.json(
      {
        action,
        entity,
        intention: action + entity,
        request: json,
        response,
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
