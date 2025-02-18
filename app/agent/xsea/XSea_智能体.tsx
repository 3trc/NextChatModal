import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { AgentRouteMap, ChatMessageX } from "..";
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
    return [{ role: "assistant", content: "", component: "@ui-welcome" }];
  }

  public RouteMap(): AgentRouteMap {
    return {
      查询: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
      },
      询问: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
      },
      创建: {
        产品: "XSea_创建产品",
        脚本: "XSea_创建脚本",
        压测: "XSea_执行压测",
      },
      执行: {
        压测: "XSea_执行压测",
      },
    };
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
