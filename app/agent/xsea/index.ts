import { BuiltinMask } from "@/app/masks";

export interface ChatMessageX {
  role: "system" | "user" | "assistant";
  content: string;
  noLLM?: boolean;
  noUI?: boolean;
  noHistory?: boolean;
}

export interface AgentSwitcher {
  agentName: string;
  bridgeMessages?: ChatMessageX[];
}

export interface Agent extends BuiltinMask {}
