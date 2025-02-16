import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { AgentRouteMap, ChatMessageX, MaybeAgentSwitcher } from "..";
import { AgentStore } from "../store";
import LocalJSON from "@/app/components/xsea/localJSON";

export class Agent_XSea_执行压测 extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_执行压测",
        context: [
          {
            id: "",
            role: "system",
            content: `
确保中文回答，确保回答"开始"，避免回答非"开始"文本，避免回答超过两个汉字，避免回答英文
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

  public onBeforeActive(): MaybeAgentSwitcher {
    if (LocalJSON.selected_scripts?.length > 0) {
      // return {
      //   agentName: "XSea_确认压测",
      //   bridgeMessages: [
      //     {
      //       role: "assistant",
      //       content: "好的，这就为你准备启动压测 🚀",
      //     },
      //   ],
      // };
    } else {
      return {
        agentName: "XSea_查询脚本",
        bridgeMessages: [
          {
            role: "assistant",
            content:
              "🤔 看起来你还没有选择任何脚本，这样不能开始压测哦，我们去选择一些脚本吧！",
          },
        ],
      };
    }
  }

  public welcome(): ChatMessageX[] {
    return [{ role: "assistant", content: "[ui-confirm]" }];
  }

  public RouteMap(): AgentRouteMap {
    return {
      肯定: {
        产品: "XSea_确认压测",
        脚本: "XSea_确认压测",
        计划: "XSea_确认压测",
        压测: "XSea_确认压测",
        记录: "XSea_确认压测",
        概念: "XSea_确认压测",
        其他: "XSea_确认压测",
      },
      否定: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_查询脚本",
        压测: "XSea_查询脚本",
        记录: "XSea_查询脚本",
        概念: "XSea_查询脚本",
        其他: "XSea_查询脚本",
      },
      终止: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_查询脚本",
        压测: "XSea_智能体",
        记录: "XSea_查询记录",
        概念: "XSea_知识库",
        其他: "XSea_智能体",
      },
      陈述: {
        产品: "XSea_查询产品",
        脚本: "XSea_知识库",
        计划: "XSea_知识库",
        压测: "XSea_确认压测",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
      },
      创建: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_创建计划",
        压测: "XSea_确认压测",
        记录: "XSea_执行压测",
        概念: "XSea_知识库",
      },
      查询: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_查询脚本",
        压测: "XSea_查询脚本",
        记录: "XSea_查询脚本",
        概念: "XSea_知识库",
        其他: "XSea_查询脚本",
      },
      询问: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_知识库",
        压测: "XSea_知识库",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
        其他: "XSea_查询脚本",
      },
      修改: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_查询计划",
        压测: "XSea_查询脚本",
        记录: "XSea_查询记录",
        概念: "XSea_知识库",
        其他: "XSea_查询脚本",
      },
      执行: {
        产品: "XSea_知识库",
        脚本: "XSea_执行脚本",
        计划: "XSea_执行压测",
        压测: "XSea_确认压测",
        记录: "XSea_确认压测",
        概念: "XSea_知识库",
        其他: "XSea_知识库",
      },
      其他: {
        产品: "XSea_知识库",
        脚本: "XSea_查询脚本",
        计划: "XSea_知识库",
        压测: "XSea_确认压测",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
      },
    };
  }
}

const XSea_执行压测 = () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  const agent = new Agent_XSea_执行压测(chatStore, navigate);
  useEffect(() => {
    AgentStore.register(agent.Name, agent);
  }, []);
  return <></>;
};

export default XSea_执行压测;
