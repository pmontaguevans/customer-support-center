export interface IAgent extends IOptionalAgentProps {
  name: string;
}
interface IOptionalAgentProps {
  id?: string | null;
  assignedToTicket?: boolean | null;
  ticketId?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface ITicket {
  title: string;
  description: string;
  customerName: string;
  email: string;
  productNo: string;
}
