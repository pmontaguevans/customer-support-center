import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useLoaderData, Form } from "react-router-dom";
import api, { Agent, Ticket } from "../../axios";
import "./Agent.css";

export async function loader({ params }: any) {
  const agent: Agent = await api.agents.getOne(params.agentId);
  const tickets: Ticket[] = await api.tickets.getAll();

  return { agent, tickets, agentId: params.agentId };
}

export async function action({ request, params }: any) {
  let formData = await request.formData();
  return await api.agents.update(params.agentId, formData);
}

type TicketOptions = {
  _id: string;
  title: string;
};

type LoaderData = {
  agent: Agent;
  tickets: Ticket[];
  agentId: string;
};

interface AgentFormData {
  name: string;
  ticketId: string | null;
  assignedToTicket: boolean;
}

export default function AgentDetails() {
  const { agent, tickets, agentId }: LoaderData = useLoaderData() as LoaderData;
  const [localAgent, setLocalAgent]: any = useState(agent);
  const [ticketId, setTicketId]: any = useState(agent?.ticketId);
  const [filterTickets, setFilteredTickets]: any = useState([]);

  const handleChange = async (option: TicketOptions) => {
    const updatedData: AgentFormData = {
      name: agent.name,
      ticketId: option._id,
      assignedToTicket: true,
    };

    setTicketId(option._id);

    await updateAgent(updatedData);
    await getAgent();
    await api.tickets.update(option._id, { agentId });

    const newTicketsArr = filterTickets.filter(
      (ticket: Ticket) => ticket._id !== option._id
    );

    setFilteredTickets(newTicketsArr);
  };

  const updateAgent = async (updatedData: AgentFormData) => {
    return await api.agents.update(agentId, updatedData);
  };

  const resolveTicket = async () => {
    await api.tickets.update(ticketId, { resolved: true });

    const updateAgentData: AgentFormData = {
      name: agent.name,
      ticketId: null,
      assignedToTicket: false,
    };

    await updateAgent(updateAgentData);
    await getAgent();
  };

  const getAgent = async () => {
    const data = await api.agents.getOne(agentId);
    return setLocalAgent(data);
  };

  const getTickets = async () => {
    return await api.tickets.getAll();
  };

  useEffect(() => {
    getAgent();
    getTickets();
  }, [agent.assignedToTicket, localAgent?.assignedToTicket, filterTickets]);

  useEffect(() => {
    const data = async () => {
      const filteredTickets = tickets.filter(
        (ticket: Ticket) =>
          (ticket.agentId === agentId || ticket.agentId === null) &&
          !ticket.resolved
      );

      setFilteredTickets(filteredTickets);
      return { tickets };
    };
    data();
  }, []);

  return (
    <>
      <h1>Agent details</h1>
      <div className="agent">
        <div className="agent__details">
          <div className="contact__details--status">
            <h2 className="contact__details--heading2">
              {agent ? <>{agent.name}</> : <i>No Name</i>}{" "}
            </h2>
            <span className="agent__status">
              <span
                className={localAgent?.assignedToTicket ? "red" : "green"}
              ></span>
            </span>
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
              <h4>Ticket list</h4>

              {/* TODO: Value should be set to Select after ticket is resolved */}
              <div className="form__select">
                <Select
                  id="ticketForm"
                  isMulti={false}
                  getOptionLabel={(ticket: TicketOptions) => ticket.title}
                  getOptionValue={(ticket: TicketOptions) => ticket._id}
                  //@ts-ignore
                  onChange={handleChange}
                  options={filterTickets}
                  isSearchable={false}
                  //@ts-ignore
                  defaultValue="Select"
                  isDisabled={localAgent?.assignedToTicket}
                />
              </div>
            </div>
          </div>

          <div className="contact__details--btn-container">
            <button
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
