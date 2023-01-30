export interface IAgent extends IOptionalAgentProps {
  name: string;
}
interface IOptionalAgentProps {
  id?: string | null;
  ticketId?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
