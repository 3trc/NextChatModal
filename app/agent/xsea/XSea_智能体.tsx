import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { AgentRouteMap } from "..";
import { AgentStore } from "../store";

export class Agent_XSea_智能体 extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_智能体",
        context: [
          {
            id: "",
            role: "system",
            content: ``.trim(),
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
    return {
      肯定: {
        产品: "XSea_知识库",
        脚本: "XSea_知识库",
        计划: "XSea_知识库",
        压测: "XSea_知识库",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
        其他: "XSea_知识库",
      },
      否定: {
        产品: "XSea_知识库",
        脚本: "XSea_知识库",
        计划: "XSea_知识库",
        压测: "XSea_知识库",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
        其他: "XSea_知识库",
      },
      终止: {
        产品: "XSea_智能体",
        脚本: "XSea_智能体",
        计划: "XSea_智能体",
        压测: "XSea_智能体",
        记录: "XSea_智能体",
        概念: "XSea_智能体",
        其他: "XSea_智能体",
      },
      陈述: {},
      创建: {
        产品: "XSea_创建产品",
        脚本: "XSea_创建脚本",
        计划: "XSea_创建计划",
        压测: "XSea_执行压测",
        记录: "XSea_执行压测",
        概念: "XSea_知识库",
        其他: "XSea_知识库",
      },
      查询: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_查询计划",
        压测: "XSea_查询压测",
        记录: "XSea_查询记录",
        概念: "XSea_知识库",
        其他: "XSea_知识库",
      },
      询问: {
        产品: "XSea_知识库",
        脚本: "XSea_知识库",
        计划: "XSea_知识库",
        压测: "XSea_知识库",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
        其他: "XSea_知识库",
      },
      修改: {
        产品: "XSea_知识库",
        脚本: "XSea_知识库",
        计划: "XSea_知识库",
        压测: "XSea_知识库",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
        其他: "XSea_知识库",
      },
      执行: {
        产品: "XSea_执行压测",
        脚本: "XSea_执行脚本",
        计划: "XSea_执行压测",
        压测: "XSea_执行压测",
        记录: "XSea_执行压测",
        概念: "XSea_知识库",
        其他: "XSea_知识库",
      },
      其他: {
        概念: "XSea_知识库",
      },
    };
  }
}

const XSea_智能体 = () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  useEffect(() => {
    const agent = new Agent_XSea_智能体(chatStore, navigate);
    AgentStore.register(agent.Name, agent);
  }, []);
  return <></>;
};

export default XSea_智能体;
