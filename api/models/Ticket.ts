import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TicketSchema = new Schema(
  new Schema({
    date: {
      type: Date,
      default: () => Date.now(),
    },
    title: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 2,
      max: 500,
    },
    customerName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    productNo: {
      type: Number,
      required: true,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
    },
  })
);

const Ticket = mongoose.model("Ticket", TicketSchema);
export default Ticket;
