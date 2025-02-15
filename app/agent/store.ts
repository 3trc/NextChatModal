import Agent from ".";

export class AgentConnector {
  private store = new Map<string, Agent>();

  public register(name: string, agent: Agent) {
    this.store.set(name, agent);
  }

  public get(name: string) {
    const agent = this.store.get(name);
    if (!agent) {
      throw new Error(`AgentStore: Can not find agent ${name}!`);
    }
    return agent;
  }

  public MaskList() {
    return Array.from(this.store.values()).map((agent) => agent.Mask);
  }
}

const agentStore = new AgentConnector();

export const AgentStore = agentStore;
