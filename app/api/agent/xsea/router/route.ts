import { NextRequest, NextResponse } from "next/server";
import model from "../model";

export async function POST(request: NextRequest) {
  const actions = [
    "肯定",
    "否定",
    "终止",
    "描述",
    "创建",
    "查询",
    "解释",
    "修改",
    "执行",
    "其他",
  ];
  const entities = ["产品", "脚本", "计划", "压测", "记录", "知识", "其他"];
  try {
    const json = await request.json();
    const jsonText = JSON.stringify(json, null, 2);
    const result = await model.invoke([
      {
        role: "system",
        content: `
你是一个意图分类器，用户会给你发送如下格式的JSON
{
  "scenario": "xxx",
  "question": "xxx",
  "answer": "xxx"
}
- scenario: 代表对话的场景
- question: 代表对话中助手的问题
- answer: 代表对话中用户的回答

你需要分类answer的【行为】到如下类别
1. 肯定: 肯定|同意|确认|接受|认可|可以|ok
2. 否定: 否定|拒绝|不对|不行|错了|有问题|no
3. 终止: 退出|停止|取消|返回|关闭|放弃|重来|算了|终止|stop
4. 描述: 说明|定义|形容|修饰|描述
5. 创建: 新建|新增|创建|添加|追加|生成|制作
6. 查询: 查看|列出|查询|选择|筛选|获取|列举|绑定
7. 分析: 排查|分析|定位|诊断|评估
8. 修改: 优化|调整|更新|改进|编辑|修改
9. 执行: 启动|开始|执行|运行|测试|调试|验证
10. 其他: 不属于以上分类的行为

你需要分类answer所指的【实体】到如下类别
1. 产品: 产品
2. 脚本: 脚本|JMeter|Gatling|Shell
3. 计划: 计划|测试计划
4. 压测: 目标|压测|测试|压测场景|流量配置
5. 记录: 记录|压测结果
6. 概念: 压测相关概念|测试相关概念|脚本相关概念|XSea相关概念
7. 其他: 不属于以上分类的实体

输出检查
- 确保输出内容在8个字符以内
- 确保输出内容以"["符号开头
- 确保输出内容以"]"符号结束
- 确保输出内容是[行为序号,实体序号]格式
- 确保不输出多余的聊天消息
      `.trim(),
      },
      { role: "user", content: jsonText },
    ]);
    let actionIndex = actions.length;
    let entityIndex = entities.length;
    try {
      [actionIndex, entityIndex] = JSON.parse(result.content as string);
    } catch (error) {
      console.log(1234, result.content);
    }
    const action = actions[actionIndex - 1] ?? "其他";
    const entity = entities[entityIndex - 1] ?? "其他";
    return NextResponse.json(result.content, {
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
