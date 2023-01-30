import React, { useState, useEffect } from "react";
import api from "../axios";

const Agents = ({ getAgents, setError, getAllAgents }: any) => {
  const [name, setName] = useState("");

  async function updateAgent(agentId: any) {
    if (!name) {
      setError("Field cannot be empty.");
    }
    if (agentId) {
      const updateAgentData = {
        name,
      };

      try {
        await api.put(`/agents/${agentId}`, updateAgentData);
        setName("");
      } catch (err: any) {
        throw new Error(err);
      }
    }
  }

  function updateAgentName(agent: any, e: any) {
    e.preventDefault();
    updateAgent(agent._id);
    setName("");
  }

  async function deleteAgent(id: any, e: any) {
    e.preventDefault();

    if (id) {
      try {
        await api.delete(`/agents/${id}`).then(() => getAllAgents());
        setName("");
      } catch (err: any) {
        throw new Error(err);
      }
    }
  }

  useEffect(() => {
    getAllAgents();
  }, []);
  return (
    <>
      {getAgents &&
        getAgents.map((agent: any, idx: number) => (
          <tr key={"row-" + idx}>
            <td>{agent.name}</td>
            <td>
              <input onChange={(e) => setName(e.target.value)} />
              <button onClick={(e) => updateAgentName(agent, e)}>Update</button>
            </td>
            <td>
              <button onClick={(e) => deleteAgent(agent._id, e)}>Delete</button>
            </td>
          </tr>
        ))}
    </>
  );
};

export default Agents;
