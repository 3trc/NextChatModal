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

export interface Agent extends BuiltinMask {
  welcome?: ChatMessageX;
  beforeActive?: () => MaybeAgentSwitcher;
  afterActive?: () => MaybeAgentSwitcher;
  beforeExit?: () => MaybeAgentSwitcher;
  afterExit?: () => MaybeAgentSwitcher;
}
