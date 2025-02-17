import Agent from ".";

export class AgentConnector {
  private store = new Map<string, Agent>();

  public register(name: string, agent: Agent) {
    this.store.set(name, agent);
  }

  public get(name: string) {
    const agent = this.store.get(name);
    if (!agent) {
      const errorMessage = `AgentStore: Can not find agent ${name}!`;
      alert(errorMessage);
      throw new Error(errorMessage);
    }
    return agent;
  }

  public MaskList() {
    return Array.from(this.store.values()).map((agent) => agent.Mask);
  }
}

const agentStore = new AgentConnector();

export const AgentStore = agentStore;
