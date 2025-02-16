import { Path } from "@/app/constant";
import { BuiltinMask } from "@/app/masks";
import { ChatStore } from "@/app/store";
import { Mask } from "@/app/store/mask";
import { ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";
import { AgentStore } from "./store";

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

export default class Agent {
  public constructor(
    public readonly mask: Omit<BuiltinMask, "lang" | "builtin" | "createdAt">,
    public readonly chatStore: ChatStore,
    public readonly navigate: NavigateFunction,
  ) {}

  public welcome() {
    return [] as ChatMessageX[];
  }

  public onBeforeActive() {
    return null as MaybeAgentSwitcher;
  }

  public get Mask() {
    return {
      ...this.mask,
      lang: "cn",
      builtin: true,
      createdAt: 0,
    } as Mask;
  }

  public get Name() {
    return this.Mask.name;
  }

  public async Active() {
    this.chatStore.newSession(this.Mask);
    this.navigate(Path.Chat);
    let switcher = await this.onBeforeActive();
    if (switcher) {
      // 这里需要触发转场消息
      await AgentStore.get(switcher.agentName).Active();
      return;
    }
    // 这里要欢迎
  }
}
