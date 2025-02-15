import { BuiltinMask } from "@/app/masks";
import { ReactNode } from "react";

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
  | Promise<AgentSwitcher>
  | null
  | undefined;

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
  public constructor(private readonly life: AgentLifeCycle) {}

  private timer: any = null;

  public Active() {
    this.life.onBeforeActive?.();
    this.life.onAfterActive?.();
  }

  public Exit() {
    this.life.onBeforeExit?.();
    this.life.onAfterExit?.();
  }
}
