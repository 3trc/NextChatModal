import { Path } from "@/app/constant";
import { BuiltinMask } from "@/app/masks";
import { ChatStore } from "@/app/store";
import { Mask } from "@/app/store/mask";
import { ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";
import { AgentStore } from "./store";
import { nanoid } from "nanoid";
import axios from "axios";

export interface ChatMessageX {
  role: "system" | "user" | "assistant";
  content: string;
  component?: ReactNode;
  noLLM?: boolean;
  noUI?: boolean;
  noHistory?: boolean;
}

export interface AgentSwitcher {
  agentName: string;
  bridgeMessages?: ChatMessageX[];
}

export type MaybeAgentSwitcher =
  | AgentSwitcher
  | null
  | undefined
  | void
  | Promise<AgentSwitcher | null | undefined | void>;

export type AgentRouteMap = {
  [actionName: string]: {
    [entityName: string]: string;
  };
};

export default class Agent {
  public constructor(
    public readonly mask: Omit<BuiltinMask, "lang" | "builtin" | "createdAt">,
    public readonly chatStore: ChatStore,
    public readonly navigate: NavigateFunction,
  ) {
    this.id = nanoid();
  }

  private id = "";

  public welcome() {
    return [] as ChatMessageX[];
  }

  public onBeforeActive(): MaybeAgentSwitcher {
    return null;
  }

  public async SendMessage(message: ChatMessageX) {
    await this.onBeforeSendMessage(message.content);
    this.SendMessageList([message]);
  }

  public async SendMessageList(messages: ChatMessageX[]) {
    if (messages.length < 1) return;
    await this.chatStore.SendMessages(messages);
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

  public async onBeforeSendMessage(userMessage: string) {
    const session = this.chatStore.currentSession();
    const messages = session.messages;
    const dialogue = {
      question:
        messages[messages.length - 1]?.content || "你好，有什么可以帮你的吗？",
      answer: userMessage,
    };
    const res = await axios.post(`/api/agent/xsea/router`, dialogue);
    const { action, entity, intention } = res.data;
    const nextAgentName = this.RouteMap()[action]?.[entity];
    console.log("【意图路由】", intention, nextAgentName);
    return null;
  }

  public get Mask() {
    return {
      ...this.mask,
      id: this.id,
      lang: "cn",
      builtin: true,
      createdAt: 0,
    } as Mask;
  }

  public get Id() {
    return this.id;
  }

  public get Name() {
    return this.Mask.name;
  }

  public async Active() {
    const session = this.chatStore.currentSession();
    const prevMessages = JSON.parse(JSON.stringify(session.messages));
    this.chatStore.newSession(this.Mask, prevMessages);
    this.navigate(Path.Chat);
    let switcher = await this.onBeforeActive();
    if (switcher) {
      await this.SendMessageList(switcher.bridgeMessages ?? []);
      await AgentStore.get(switcher.agentName).Active();
      return;
    }
    this.SendMessageList(this.welcome());
  }
}
