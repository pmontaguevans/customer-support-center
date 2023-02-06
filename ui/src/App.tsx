import React, { useState, useEffect } from "react";
import {
  Outlet,
  useNavigation,
  useLoaderData,
  redirect,
} from "react-router-dom";
import api, { Agent, Ticket } from "./axios";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";

type FormData = {
  [k: string]: any;
  name: string;
  status: boolean | false;
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
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const { agents }: LoaderData = useLoaderData() as LoaderData;
  const [status, setStatus] = useState({
    label: "Available",
    hasActiveTicket: null,
  });

  return (
    <div className="page">
      <Sidebar agents={agents} status={status} />
      <div
        className={navigation.state === "loading" ? "loading" : ""}
        id="detail"
      >
        <Outlet context={{ setStatus, status }} />
      </div>
    </div>
  );
}

export default App;
