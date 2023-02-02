import React from "react";
import { useLoaderData, Form, useOutletContext } from "react-router-dom";
import Select from "react-select";
import api from "../../axios";
import "./Agent.css";

export async function loader({ params }: any) {
  const { data }: any = await api.get(`/agents/${params.agentId}`);
  const { data: tickets } = await api.get("/tickets");

  return { agent: data.agent, tickets, agentId: params.agentId };
}

export async function action({ request, params }: any) {
  let formData = await request.formData();
  return await api.put(`/agents/${params.agentId}`, formData);
}

type TicketOptions = {
  _id: any;
  title: string;
};

export default function Agent() {
  const { setStatus, status }: any = useOutletContext();
  const { agent, tickets, agentId }: any = useLoaderData();
  const [ticketId, setTicketId]: any = React.useState(null);
  const [ticketList, setTicketList]: any = React.useState(tickets);

  const contact = {
    avatar:
      "https://this-person-does-not-exist.com/img/avatar-d0412740e4eb47cd45d4769daf900ebd.jpg",
  };
  const handleChange = async (option: TicketOptions) => {
    const updatedData: any = {
      name: agent.name,
      ticketId: option._id,
      status: true,
    };

    setTicketId(option._id);

    await api.put(`/agents/${agentId}`, updatedData);
    setStatus({ status: "Ongoing", hasActiveTicket: true });
  };

  const resolveTicket = async () => {
    const tickets = await api.delete(`/tickets/${ticketId}`);
    setTicketList(tickets);

    const updatedData: any = {
      name: agent.name,
      ticketId: null,
    };
    await api
      .put(`/agents/${agentId}`, updatedData)
      .then(() => api.get(`/agents/${agentId}`));

    await getTickets();
    setStatus({ status: "Available", hasActiveTicket: false });
  };

  const getAgent = async () => {
    await api.get(`/agents/${agentId}`);
  };

  const getTickets = async () => {
    await api.get(`/tickets`);
  };

  React.useEffect(() => {
    if (agent.status) {
      setStatus({ status: "Ongoing", hasActiveTicket: true });
    } else {
      setStatus({ status: "Available", hasActiveTicket: false });
    }
    getAgent();
  }, []);

  React.useEffect(() => {
    getAgent();
    getTickets();
  }, [agent.status, status.hasActiveTicket, tickets]);

  return (
    <>
      <h1>Agent details</h1>
      <div className="agent">
        <div>
          <img alt="Some_alt_text" key={contact.avatar} src={contact.avatar} />
        </div>
        <div className="agent__details">
          <div className="contact__details--status">
            <h2 className="contact__details--heading2">
              {agent ? <>{agent.name}</> : <i>No Name</i>}{" "}
            </h2>

            <span>{status.hasActiveTicket ? "Ongoing" : "Available"}</span>
          </div>
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

              {/* Value should be set to Select after ticket is resolved */}
              <div className="form__select">
                <Select<TicketOptions>
                  options={ticketList.tickets}
                  getOptionLabel={(ticket: TicketOptions) => ticket.title}
                  getOptionValue={(ticket: TicketOptions) => ticket._id}
                  //@ts-ignore
                  onChange={handleChange}
                  isDisabled={status.hasActiveTicket}
                />
              </div>
            </div>
          </div>

          <div className="contact__details--btn-container">
            <button
              disabled={!status.hasActiveTicket}
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
