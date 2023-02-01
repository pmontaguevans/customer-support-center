import React from "react";
import { NavLink, Form, useNavigate } from "react-router-dom";
import api from "../../axios";
import "./Sidebar.css";

const Sidebar = ({ agents, status }: any) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  const getAgents = async () => {
    const { data } = await api.get("/agents");
    setData(data.agents);
  };
  React.useEffect(() => {
    getAgents();
  }, [status]);
  return (
    <div className="sidebar">
      <h2 className="sidebar__heading2" onClick={() => navigate("/")}>Customer Support Center</h2>
      <div>
        <Form className="form__add" method="post">
          <p>
            <input
              className="form__add--input"
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
                <span>{agent.ticketId ? "ongoing" : "available"}</span>
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
