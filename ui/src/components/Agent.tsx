import React from "react";
import DeleteAgent from "./DeleteAgent";
import UpdateAgent from "./UpdateAgent";

const Agent = ({ agent, setName, updateAgentName, deleteAgent }: any) => {
  return (
    <>
      <tr>
        <td>{agent.name}</td>
        <td>
          <UpdateAgent
            onChange={(e: any) => setName(e.target.value)}
            onClick={(e: any) => updateAgentName(agent, e)}
          />
        </td>
        <td>
          <DeleteAgent onClick={(e: any) => deleteAgent(agent._id, e)} />
        </td>
      </tr>
    </>
  );
};

export default Agent;
