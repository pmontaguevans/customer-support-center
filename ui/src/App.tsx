import React from "react";
import {
  Outlet,
  NavLink,
  useNavigation,
  useLoaderData,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";
import api from "./axios";
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
  const navigate = useNavigate();
  const { agents }: any = useLoaderData();

  return (
    <div className="page">
      <div className="sidebar">
        <h2 onClick={() => navigate("/")}>Customer Support Center</h2>
        <div>
          <Form className="form__add" method="post">
            <p>
              <input
                className="input"
                placeholder="Name"
                aria-label="name"
                type="text"
                name="name"
                defaultValue=""
              />
            </p>
            <button type="submit">Add Agent</button>
            <hr />
          </Form>
        </div>
        <nav>
          <h3>Current agents ({agents.length})</h3>

          {agents.length ? (
            <ul>
              {agents.map((agent: any) => (
                <li key={agent._id}>
                  <NavLink
                    to={`agents/${agent._id}`}
                    className={({ isActive, isPending }: any) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {agent.name ? <>{agent.name}</> : <i>No Name</i>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No agents</i>
            </p>
          )}
        </nav>
      </div>
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
