import { BuiltinMask } from "@/app/masks";
import { ChatStore } from "@/app/store";
import { Mask } from "@/app/store/mask";
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
  public constructor(
    private readonly life: AgentLifeCycle,
    private readonly chatStore: ChatStore,
  ) {}

  public get Mask() {
    return this.life as Mask;
  }

  public async Active() {
    let switcher = await this.life.onBeforeActive?.();
    if (switcher && switcher.agentName !== this.life.name) {
      await AgentStore.get(switcher.agentName)?.Active();
      return;
    }
    switcher = await this.life.onAfterActive?.();
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
    return this.store.get(name);
  }
}

const agentStore = new AgentConnector();

export const AgentStore = agentStore;
