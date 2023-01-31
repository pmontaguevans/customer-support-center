import { useLoaderData, Form } from "react-router-dom";
import api from "../axios";
import "../App.css";

export async function loader({ params }: any) {
  const { data }: any = await api.get(`/agents/${params.agentId}`);
  return { agent: data.agent };
}

export default function Agent() {
  const { agent }: any = useLoaderData();
  const contact = {
    avatar: "https://placekitten.com/g/200/200",
  };

  return (
    <div className="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar} />
      </div>
      <div className="contact__details">
        <h1>{agent ? <>{agent.name}</> : <i>No Name</i>} </h1>
        <div className="form__actions">
          <Form className="form__edit" action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form className="form__destroy" method="post" action="destroy">
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
