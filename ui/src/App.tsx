import React from "react";
import {
  Outlet,
  useNavigation,
  useLoaderData,
  redirect,
} from "react-router-dom";
import api, { Agent } from "./axios";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";

type FormData = {
  [k: string]: any;
  name: string;
  assignedToTicket: boolean;
  ticketId: string | null;
};

type LoaderData = {
  agents: Agent[];
};

export async function action({ request }: any) {
  const formData = await request.formData();
  const updates: FormData = Object.fromEntries(formData) as FormData;
  const data: Agent = await api.agents.create(updates);
  return redirect(`/agents/${data._id}`);
}

export async function loader() {
  try {
    const agents = await api.agents.getAll();
    return { agents };
  } catch (err: any) {
    throw new Error(err);
  }
}
function App() {
  const navigation = useNavigation();
  const { agents }: LoaderData = useLoaderData() as LoaderData;

  return (
    <div className="page">
      <Sidebar agents={agents} />
      <div
        className={navigation.state === "loading" ? "loading" : ""}
        id="detail"
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
