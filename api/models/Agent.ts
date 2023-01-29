import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AgentSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  ticketId: {
    type: Schema.Types.ObjectId,
    ref: "Ticket",
  },
});

// Compile model from schema
const Agent = mongoose.model("Agent", AgentSchema);
export default Agent;
