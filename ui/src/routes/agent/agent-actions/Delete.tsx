import { redirect } from "react-router-dom";
import api, { Agent } from "../../../axios";

export async function action({ params }: any) {
  try {
    const agent: Agent = await api.agents.getOne(params.agentId);

    if (agent.ticketId) {
      await api.tickets.update(agent.ticketId!, {
        agentId: null,
        resolved: false,
      });
    }

    await api.agents.delete(params.agentId);
    return redirect("/");
  } catch (err: any) {
    throw new Error(err);
  }
}
