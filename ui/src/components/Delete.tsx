import { redirect } from "react-router-dom";
import api from "../axios";

export async function action({ params }: any) {
  await await api.delete(`/agents/${params.agentId}`);
  return redirect("/");
}
