import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import api from "../../../axios";
import "./Actions.css";

async function updateAgent(agentId: any, updates: any) {
  try {
    if (agentId) {
      const { data } = await api.put(`/agents/${agentId}`, updates);
      return data;
    }
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function action({ request, params }: any) {
  const formData = await request.formData();
  if (!formData) {
    console.log("Data missing");
    return true;
  } else {
    const updates = Object.fromEntries(formData);
    await updateAgent(params.agentId, updates);
    return redirect(`/agents/${params.agentId}`);
  }
}

export default function EditAgent() {
  const agent: any = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="agent-form">
      <h1 className="">Edit agent</h1>
      <div className="form__row">
        <p>
          <span>Name</span>
          <input
            className="input"
            placeholder="Name"
            aria-label="name"
            type="text"
            name="name"
            defaultValue={agent.name}
          />
        </p>
        <hr />
        <p className="action__buttons">
          <button className="edit" type="submit">
            Save
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="cancel"
            type="button"
          >
            Cancel
          </button>
        </p>
      </div>
    </Form>
  );
}
