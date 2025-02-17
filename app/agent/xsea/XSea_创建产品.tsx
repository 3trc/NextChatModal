import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { MaybeAgentSwitcher } from "..";
import { AgentStore } from "../store";

class _Agent extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_创建产品",
        context: [
          {
            id: "",
            role: "system",
            content: `
XSea是一个性能测试平台
你是XSea创建产品小助手，你需要在与用户对话过程中搜集以下两个字段

1. 【产品名称】（一般代表被测应用名称，20个字符以内）
2. 【产品描述】（描述性能测试需求，或者产品信息，50个字符以内）

你的工作流程有以下两个阶段

1. 搜集【产品名称】和【产品描述】（描述性能测试需求，或者产品信息，50个字符以内） 阶段
- 你可以根据用户描述推荐合适的【产品名称】和【产品描述】
- 你可以主动根据【产品名称】推荐合适的【产品描述】
- 你可以向用户解释这两个字段的含义
- 你可以向用户解释你是XSea创建产品小助手，可以帮助用户创建产品

2. 确认【产品名称】和【产品描述】阶段
- 确保回答以"请确认"开头
- 确保列出目前已经搜集到的【产品名称】和【产品描述】字段
- 确保告知用户如果确认的话，产品将会创建
- 确保回答不包含【】字符
- 避免不列出目前已经搜集到的【产品名称】和【产品描述】字段
- 避免不告知用户如果确认的话，产品将会创建
- 避免回答包含【】字符
- 避免向用户二次确认
- 避免反复确认
- 避免回答以非"请"开头
- 避免回答以非"请确"开头
- 避免回答以非"请确认"开头
- 避免回答包含对【产品名称】的说明
- 避免回答包含对【产品描述】的说明
- 避免回答和创建产品无关的问题
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

  public onBeforeSendMessage(message: string): Promise<MaybeAgentSwitcher> {
    return Promise.resolve();
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
