import React, { useState } from "react";
import { useLoaderData, Form, useOutletContext } from "react-router-dom";
import Select from "react-select";
import api from "../axios";
import "../App.css";

export async function loader({ params }: any) {
  const { data }: any = await api.get(`/agents/${params.agentId}`);
  const { data: tickets } = await api.get("/customer");

  return { agent: data.agent, tickets, agentId: params.agentId };
}

export async function action({ request, params }: any) {
  let formData = await request.formData();
  return await api.put(`/agents/${params.agentId}`, {
    ticketId: formData.get("favorite") === "true",
  });
}

type TicketOptions = {
  _id: any;
  title: string;
};

export default function Agent() {
  const { setStatus, status }: any = useOutletContext();
  const { agent, tickets, agentId }: any = useLoaderData();
  const contact = {
    avatar: "https://placekitten.com/g/200/200",
  };
  const [state, setState]: any = useState({ selectedTicket: null });
  const [data, setData] = useState(null);
  const handleChange = async (option: TicketOptions) => {
    setState({
      selectedTicket: option.title,
    });

    const updatedData: any = {
      name: agent.name,
      ticketId: option._id,
    };

    await api
      .put(`/agents/${agentId}`, updatedData)
      .then(() => api.get("/agents"));

    setStatus(option._id);
  };

  const resolveTicket = async () => {
    const updatedData: any = {
      name: agent.name,
      ticketId: null,
    };
    await api
      .put(`/agents/${agentId}`, updatedData)
      .then(() => api.get(`/agents/${agentId}`));
    setState({ selectedTicket: null });
    setStatus(null);
  };

  const getAgent = async () => {
    const { data } = await api.get(`/agents/${agentId}`);
    return setData(data);
  };

  React.useEffect(() => {
    if (agent.ticketId) {
      const selected = tickets.tickets.find(
        (ticket: any) => ticket._id === agent.ticketId
      );
      setState({ selectedTicket: selected.title });
    }
  }, []);

  React.useEffect(() => {
    getAgent();
  }, [status]);

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
        <div>
          Assign agent to ticket
          <Select<TicketOptions>
            options={tickets.tickets}
            getOptionLabel={(ticket: TicketOptions) => ticket.title}
            getOptionValue={(ticket: TicketOptions) => ticket._id}
            //@ts-ignore
            onChange={handleChange}
            isDisabled={!!status}
          />
        </div>
        <div>{status ? `Ongoing with ticket ${status}` : "Available"}</div>
        <button onClick={resolveTicket}>Resolve</button>
      </div>
    </div>
  );
}
