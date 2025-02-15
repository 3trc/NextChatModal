import { Path } from "@/app/constant";
import { BuiltinMask } from "@/app/masks";
import { ChatStore } from "@/app/store";
import { Mask } from "@/app/store/mask";
import { ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";

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

type MaybeAgentSwitcher =
  | AgentSwitcher
  | null
  | undefined
  | Promise<AgentSwitcher | null | undefined>;

export interface AgentLifeCycle extends BuiltinMask {
  welcome?: ChatMessageX;
  onBeforeActive?: () => MaybeAgentSwitcher;
  onAfterActive?: () => MaybeAgentSwitcher;
  onBeforeSendMessage?: () => MaybeAgentSwitcher;
  onAfterSendMessage?: () => MaybeAgentSwitcher;
  onBeforeReceiveMessage?: () => MaybeAgentSwitcher;
  onAfterReceiveMessage?: () => MaybeAgentSwitcher;
  onHeartbeat?: () => MaybeAgentSwitcher;
  onBeforeExit?: () => MaybeAgentSwitcher;
  onAfterExit?: () => MaybeAgentSwitcher;
  bye?: ChatMessageX;
}

export default class Agent {
  public constructor(
    private readonly life: AgentLifeCycle,
    private readonly chatStore: ChatStore,
    private readonly navigate: NavigateFunction,
  ) {}

  public get Mask() {
    return {
      ...this.life,
      lang: "cn",
      builtin: true,
      createdAt: 0,
    } as Mask;
  }

  public async Active() {
    this.chatStore.newSession(this.Mask);
    this.navigate(Path.Chat);
    let switcher = await this.life.onBeforeActive?.();
    if (switcher) {
      // 这里需要触发转场消息
      await AgentStore.get(switcher.agentName).Active();
      return;
    }
    // 这里要欢迎
    switcher = await this.life.onAfterActive?.();
    if (switcher) {
      // 这里需要触发转场消息
      await AgentStore.get(switcher.agentName).Active();
      return;
    }
  }

  public Exit() {
    this.life.onBeforeExit?.();
    this.life.onAfterExit?.();
  }
}

export class AgentConnector {
  private store = new Map<string, Agent>();

  public register(name: string, agent: Agent) {
    this.store.set(name, agent);
  }

  public get(name: string) {
    const agent = this.store.get(name);
    if (!agent) {
      throw new Error(`AgentStore: can not find agent ${name}!`);
    }
    return agent;
  }
}

const agentStore = new AgentConnector();

export const AgentStore = agentStore;
