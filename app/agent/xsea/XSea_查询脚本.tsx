import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { AgentRouteMap, ChatMessageX } from "..";
import { AgentStore } from "../store";
import LocalJSON from "@/app/components/xsea/localJSON";

export class Agent_XSea_查询脚本 extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_查询脚本",
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

  public onBeforeActive(): any {
    if (LocalJSON.selected_product) {
    } else {
      return {
        agentName: "XSea_查询产品",
        bridgeMessages: [
          {
            role: "assistant",
            content: "🤔 我需要知道你想查看哪个产品下的脚本，请选择一个吧？",
          },
        ],
      };
    }
  }

  public welcome(): ChatMessageX[] {
    return [
      {
        role: "assistant",
        content: "[ui-scripts]",
        // component: <ScriptSelector types={["JMETER", "GATLING", "SHELL"]} />,
      },
    ];
  }

  public RouteMap(): AgentRouteMap {
    return {
      肯定: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_知识库",
        压测: "XSea_执行压测",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
        其他: "XSea_知识库",
      },
      否定: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_知识库",
        压测: "XSea_执行压测",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
        其他: "XSea_查询产品",
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
      陈述: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_知识库",
        压测: "XSea_执行压测",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
        其他: "XSea_知识库",
      },
      创建: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_知识库",
        压测: "XSea_执行压测",
        记录: "XSea_知识库",
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
        其他: "XSea_查询产品",
      },
      询问: {
        产品: "XSea_查询产品",
        脚本: "XSea_知识库",
        计划: "XSea_知识库",
        压测: "XSea_知识库",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
        其他: "XSea_查询产品",
      },
      修改: {
        产品: "XSea_查询产品",
        脚本: "XSea_知识库",
        计划: "XSea_知识库",
        压测: "XSea_知识库",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
        其他: "XSea_查询产品",
      },
      执行: {
        产品: "XSea_查询产品",
        脚本: "XSea_执行脚本",
        计划: "XSea_执行压测",
        压测: "XSea_执行压测",
        记录: "XSea_执行压测",
        概念: "XSea_知识库",
        其他: "XSea_执行压测",
      },
      其他: {
        产品: "XSea_查询产品",
        概念: "XSea_知识库",
      },
    };
  }
}

const XSea_查询脚本 = () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  useEffect(() => {
    const agent = new Agent_XSea_查询脚本(chatStore, navigate);
    AgentStore.register(agent.Name, agent);
  }, []);
  return <></>;
};

export default XSea_查询脚本;
