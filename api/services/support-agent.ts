import { IAgent } from "./interfaces";

const agents: IAgent[] = [];

export const getAllAgents = async (): Promise<IAgent[]> => {
  return agents;
};

export const createAgents = (agent: IAgent) => {
  agents.push(agent);
};
