import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const AgentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: [2, "Agent name must have 2 characters or more"],
      max: [50, "Agent name cannot have more than 50 characters"],
    },
    ticketId: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Agent = mongoose.model("Agent", AgentSchema);
export default Agent;
