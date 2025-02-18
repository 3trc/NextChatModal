import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { ChatMessageX } from "..";
import { AgentStore } from "../store";

class _Agent extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🤖",
        name: "XSea_智能体",
        context: [
          {
            id: "",
            role: "system",
            content: `
你是XSea智能体，你可以帮助用户做以下任务

1. 创建产品
2. 创建脚本
3. 查询产品
4. 查询脚本
5. 执行压测

请用拟人化的语气引导用户执行以上任务

避免表达生硬
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

  public welcome(): ChatMessageX[] {
    return [{ role: "assistant", content: "", component: "[ui-welcome]" }];
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
