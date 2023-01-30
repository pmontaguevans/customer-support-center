import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../axios";
import AddAgent from "./AddAgent";
import Agent from "./Agent";

type Input = {
  name: string;
};

function AgentForm() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    resetField,
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => {
    addAgent(data.name);
  };

  const [getAgents, setAgents]: any = useState(null);
  const [postData, setPostData]: any = useState();
  const [updateData, setUpdateData]: any = useState(null);
  const [name, setName] = useState("");
  const [error, setError]: any = useState(null);

  async function getAllAgents() {
    try {
      const { data } = await api.get("/agents");
      setAgents(data.agents);
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async function addAgent(name: string) {
    resetField("name");
    const postAgentData: any = {
      name,
    };

    try {
      const { data } = await api.post("/agents", postAgentData);
      setPostData(data);
    } catch (err: any) {
      setError(err.response.data.message || err);
    }
  }

  async function updateAgent(agentId: any) {
    if (!name) {
      setError("Field cannot be empty.");
    }
    if (agentId) {
      const updateAgentData = {
        name,
      };

      try {
        const { data } = await api.put(`/agents/${agentId}`, updateAgentData);
        setUpdateData(data);
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
    setError(null);
  }, [isDirty, isValid]);

  useEffect(() => {
    getAllAgents();
  }, [postData, updateData]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <thead>
            <tr>
              <th>Agent name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            {getAgents &&
              getAgents.map((agent: any, idx: number) => {
                return (
                  <Agent
                    key={"row-" + idx}
                    agent={agent}
                    setName={setName}
                    updateAgentName={updateAgentName}
                    deleteAgent={deleteAgent}
                  />
                );
              })}
          </thead>
        </table>
        <AddAgent register={register} errors={errors} error={error} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default AgentForm;
