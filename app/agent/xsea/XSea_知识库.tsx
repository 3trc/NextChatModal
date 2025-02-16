import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { AgentRouteMap } from "..";
import { AgentStore } from "../store";

export class Agent_XSea_知识库 extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_知识库",
        context: [
          {
            id: "",
            role: "system",
            content:
              `你只需要回答"我是XSea性能测试平台的知识库"即可，避免回答其他问题，回答控制在30个字符以内`.trim(),
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
      肯定: {},
      否定: {},
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
      },
      查询: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_查询计划",
        压测: "XSea_查询压测",
        记录: "XSea_查询记录",
      },
      询问: {},
      修改: {},
      执行: {
        脚本: "XSea_执行脚本",
        计划: "XSea_执行压测",
        压测: "XSea_执行压测",
        记录: "XSea_执行压测",
      },
      其他: {},
    };
  }
}

const XSea_知识库 = () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  useEffect(() => {
    const agent = new Agent_XSea_知识库(chatStore, navigate);
    AgentStore.register(agent.Name, agent);
  }, []);
  return <></>;
};

export default XSea_知识库;
