import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { AgentRouteMap } from "..";
import { AgentStore } from "../store";

function extractFields(text: string, fields: string[]) {
  const statements = text
    .split(/[*:：()（）\s]/)
    .map((item) => item.trim())
    .filter((item) => item);
  const result: any = {};
  fields.forEach((field) => {
    result[field] =
      statements[statements.findLastIndex((item) => item === field) + 1];
  });
  return result;
}

class _Agent extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_创建脚本",
        context: [
          {
            id: "",
            role: "system",
            content: `
XSea是一个性能测试平台
你是XSea创建脚本小助手，你需要在与用户对话过程中搜集以下两个字段

1. 脚本名称（20个字符以内）
2. 脚本类型（三个可选项 JMeter，Gatling，Shell）

你的工作流程有以下三个步骤

步骤1. 搜集 脚本名称 和 脚本类型 两个字段
- 你可以向用户解释你是XSea创建脚本小助手，可以帮助用户创建脚本
- 如果用户已经提供了 脚本名称 和 脚本类型，则不需要搜集，直接进入步骤2
- 避免在步骤1询问字段是否符合要求
- 避免在步骤1做确认

步骤2. 根据用户表达的需求编写特定类型的脚本
- 确保编写正确类型的脚本
- 确保编写符合用户需求的脚本
- 确保编写脚本之前深度思考用户的需求
- 确保脚本代码没有语法问题
- 确保输出脚本之后简单询问下这个脚本是否符合要求
- 如果用户表达当前编写的脚本已经没问题了，则进入步骤3，否则重复步骤2

步骤3. 确认 脚本名称 和 脚本类型，并提示用户如果确认的话，脚本将会创建
- 确保回答以"请确认"开头
- 确保列出目前已经搜集到的 脚本名称 和 脚本类型 字段
- 确保告知用户如果确认的话脚本将会创建
- 避免单独列出 脚本名称
- 避免单独列出 脚本描述
- 避免在列出字段的时候解释字段
- 避免在列出字段的时候出现（）符号
- 避免向用户二次确认
- 避免回答和创建脚本无关的问题
- 避免回答不以"请确认"开头
            `.trim(),
            date: "",
          },
        ],
        modelConfig: {
          model: "perfma-gpt-14b:latest",
          max_tokens: 16384,
          topK: 1,
          top_p: 0.5,
          temperature: 0.1,
        },
      },
      chatStore,
      navigate,
    );
  }

  public RouteMap(): AgentRouteMap {
    return {};
  }
}

export default () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  useEffect(() => {
    const agent = new _Agent(chatStore, navigate);
    AgentStore.register(agent.Name, agent);
  }, [chatStore, navigate]);
  return <></>;
};
