import React, { useState } from "react";
import { useLoaderData, Form, useOutletContext } from "react-router-dom";
import Select from "react-select";
import api from "../../axios";
import "./Agent.css";

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
  const [defaultValue, setDefaultValue]: any = useState("Select");
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
    setDefaultValue("Select");
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
    <>
      <h1>Agent details</h1>
      <div className="contact">
        <div>
          <img key={contact.avatar} src={contact.avatar} />
        </div>
        <div className="contact__details">
          <div className="contact__details--status">
            <h2 className="contact__details--heading2">
              {agent ? <>{agent.name}</> : <i>No Name</i>}{" "}
            </h2>

            <span>{status ? `Ongoing` : "Available"}</span>
          </div>
          {/* <div className="contact__details--actions"></div> */}
          <div className="form__actions">
            <div className="form__actions--container">
              <h4>Actions</h4>
              <div className="form">
                <Form className="form__edit" action="edit">
                  <button type="submit">Edit</button>
                </Form>
                <Form className="form__destroy" method="post" action="destroy">
                  <button type="submit">Delete</button>
                </Form>
              </div>
            </div>
            <div>
              <h4>Assign agent to ticket</h4>
              <div className="form__select">
                <Select<TicketOptions>
                  options={tickets.tickets}
                  getOptionLabel={(ticket: TicketOptions) => ticket.title}
                  getOptionValue={(ticket: TicketOptions) => ticket._id}
                  //@ts-ignore
                  onChange={handleChange}
                  isDisabled={!!status}
                  // value={status ? state.selectedTicket : defaultValue}
                  defaultSelectValue={defaultValue}
                />
              </div>
            </div>
          </div>

          <div className="contact__details--btn-container">
            <button
              disabled={!status}
              className="contact__details--resolve-btn"
              onClick={resolveTicket}
            >
              Resolve ticket
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
