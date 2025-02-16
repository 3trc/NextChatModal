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

  public async SendMessages(messages: ChatMessageX[]) {
    if (messages.length < 1) return;
    await this.chatStore.SendMessages(messages);
  }

  public async onBeforeMessageSend(userMessage: string) {
    const session = this.chatStore.currentSession();
    const messages = session.messages;
    const dialogue = {
      question:
        messages[messages.length - 1]?.content || "你好，有什么可以帮你的吗？",
      answer: userMessage,
    };
    const res = await axios.post(`/api/agent/xsea/router`, dialogue);
    console.log("意图识别", res.data);
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
      await this.SendMessages(switcher.bridgeMessages ?? []);
      await AgentStore.get(switcher.agentName).Active();
      return;
    }
    this.SendMessages(this.welcome());
  }
}
