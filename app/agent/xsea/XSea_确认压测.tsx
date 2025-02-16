import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { AgentRouteMap, MaybeAgentSwitcher } from "..";
import { AgentStore } from "../store";
import LocalJSON from "@/app/components/xsea/localJSON";
import axios from "axios";

export class Agent_XSea_确认压测 extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_确认压测",
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

  public async onBeforeActive(): Promise<MaybeAgentSwitcher> {
    if (LocalJSON.selected_scripts?.length > 0) {
      let res: any = {};
      try {
        res = await axios.post(
          `/api/object/xsea/product/${
            LocalJSON.selected_product.id
          }/script/${`841402405221584896`}/test`,
          {
            scriptIds: LocalJSON.selected_scripts.map(
              (script: any) => script.id,
            ),
          },
        );
      } catch (error) {}
      const data = res.data ?? {};
      console.log(data);
    } else {
      return {
        agentName: "XSea_执行压测",
        bridgeMessages: [],
      };
    }
  }

  // public welcome(): ChatMessageX[] {
  //   return [{ role: "assistant", content: "[ui-confirm]" }];
  // }

  public RouteMap(): AgentRouteMap {
    return {
      肯定: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_查询计划",
        压测: "XSea_查询压测",
        记录: "XSea_查询记录",
        概念: "XSea_查询脚本",
      },
      否定: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_查询脚本",
        压测: "XSea_查询脚本",
        记录: "XSea_查询记录",
        概念: "XSea_查询脚本",
        其他: "XSea_查询脚本",
      },
      终止: {
        产品: "XSea_查询产品",
        脚本: "XSea_查询脚本",
        计划: "XSea_查询计划",
        压测: "XSea_查询压测",
        记录: "XSea_查询记录",
        概念: "XSea_知识库",
      },
      陈述: {
        产品: "XSea_知识库",
        脚本: "XSea_知识库",
        计划: "XSea_知识库",
        压测: "XSea_知识库",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
      },
      创建: {
        产品: "XSea_创建产品",
        脚本: "XSea_创建脚本",
        计划: "XSea_创建计划",
        压测: "XSea_确认压测",
        记录: "XSea_确认压测",
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
        产品: "XSea_知识库",
        脚本: "XSea_知识库",
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
        压测: "XSea_查询压测",
        记录: "XSea_查询记录",
        概念: "XSea_知识库",
        其他: "XSea_查询脚本",
      },
      执行: {
        产品: "XSea_知识库",
        脚本: "XSea_执行脚本",
        计划: "XSea_确认压测",
        压测: "XSea_确认压测",
        记录: "XSea_确认压测",
        概念: "XSea_知识库",
        其他: "XSea_知识库",
      },
      其他: {
        产品: "XSea_知识库",
        脚本: "XSea_知识库",
        计划: "XSea_知识库",
        压测: "XSea_知识库",
        记录: "XSea_知识库",
        概念: "XSea_知识库",
      },
    };
  }
}

const XSea_确认压测 = () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  const agent = new Agent_XSea_确认压测(chatStore, navigate);
  useEffect(() => {
    AgentStore.register(agent.Name, agent);
  }, []);
  return <></>;
};

export default XSea_确认压测;
