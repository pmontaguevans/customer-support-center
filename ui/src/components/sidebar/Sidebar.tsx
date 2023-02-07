import React, { useState } from "react";
import { NavLink, Form, useNavigate } from "react-router-dom";
import { Agent } from "../../axios";
import "./Sidebar.css";

type Props = {
  agents: Agent[];
};

type ClassNameProps = {
  isActive: boolean;
  isPending: boolean;
};

const Sidebar = ({ agents }: Props) => {
  const navigate = useNavigate();

  const [agentName, setAgentName] = useState<string>("");
  const handleChange = (e: any) => setAgentName(e.target.value);

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
        <ul>
          {agents &&
            agents.map((agent: Agent) => (
              <li key={agent._id}>
                <NavLink
                  to={`agents/${agent._id}`}
                  className={({ isActive, isPending }: ClassNameProps) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  {agent.name ? <>{agent.name}</> : <i>No Name</i>}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
