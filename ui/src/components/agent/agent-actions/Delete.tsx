import { redirect } from "react-router-dom";
import api from "../../../axios";

export async function action({ params }: any) {
  await api.agents.delete(params.agentId);
  return redirect("/");
}
