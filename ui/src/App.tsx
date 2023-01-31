import React from "react";
import {
  Outlet,
  useNavigation,
  useLoaderData,
  redirect,
} from "react-router-dom";
import api from "./axios";
import Sidebar from "./components/Sidebar";
import "./App.css";

export async function action({ request }: any) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const { data } = await api.post("/agents", { name: updates.name });
  return redirect(`/agents/${data._id}`);
}

export async function loader() {
  try {
    const { data } = await api.get("/agents");
    return { agents: data.agents };
  } catch (err: any) {
    throw new Error(err);
  }
}
function App() {
  const navigation = useNavigation();
  const [status, setStatus] = React.useState(null);

  const { agents }: any = useLoaderData();

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
