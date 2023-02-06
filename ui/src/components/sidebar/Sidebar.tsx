import React, { useEffect, useRef } from "react";
import { NavLink, Form, useNavigate } from "react-router-dom";
import api, { Agent } from "../../axios";
import "./Sidebar.css";

type Props = {
  agents: Agent[];
  status: {
    label: string;
    hasActiveTicket: boolean | null;
  };
};

type ClassNameProps = {
  isActive: boolean;
  isPending: boolean;
};

const Sidebar = ({ agents }: Props) => {
  const navigate = useNavigate();
  const getAgents = async () => {
    const data = await api.agents.getAll();
    console.log("data", data);
  };

  const [agentName, setAgentName] = React.useState("");
  const handleChange = (e: any) => setAgentName(e.target.value);

  useEffect(() => {
    getAgents();
  }, []);

  return (
    <div className="sidebar">
      <h2 className="sidebar__heading2" onClick={() => navigate("/")}>
        Customer Support Center
      </h2>
      <div>
        <Form className="form__add" method="post">
          <p>
            <input
              className="form__add--input"
              placeholder="Name"
              aria-label="name"
              type="text"
              name="name"
              value={agentName}
              //@ts-ignore
              onChange={handleChange}
            />
          </p>
          <button disabled={!agentName} type="submit">
            Add Agent
          </button>
          <hr />
        </Form>
      </div>
      <nav>
        <h3>Current agents ({agents.length})</h3>

        {agents.length ? (
          <ul>
            {agents.map((agent: Agent) => (
              <li key={agent._id}>
                <NavLink
                  to={`agents/${agent._id}`}
                  className={({ isActive, isPending }: ClassNameProps) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  {agent.name ? <>{agent.name}</> : <i>No Name</i>}
                </NavLink>
                {/* <span>
                  {agent.status && agent.ticketId ? status.label : "Available"}
                </span> */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no__agents">
            <i>No agents</i>
          </p>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
