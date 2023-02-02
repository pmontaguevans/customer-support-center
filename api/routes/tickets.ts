import express, { Request, Response } from "express";
import Ticket from "../models/Ticket";

const ticketRouter = express.Router();

ticketRouter.get("/", (req: Request, res: Response) => {
  Ticket.find({}, (err: any, tickets: any[]) => {
    try {
      res.status(200).send({ tickets });
    } catch (err: any) {
      res.status(500).send({
        message: err.message || "An error occured while retrieving tickets.",
      });
    }
  });
});

ticketRouter.post("/", (req: Request, res: Response) => {
  const {
    title,
    description,
    customerName,
    email,
    productNo,
    resolved,
    agentId,
  } = req.body;

  if (!title || !description || !customerName || !email || !productNo) {
    res.status(400).send({ message: "Name field cannot be empty." });
    return;
  }

  const ticketDetails = new Ticket({
    title,
    description,
    customerName,
    email,
    productNo,
    resolved,
    agentId,
  });

  Ticket.exists({ productNo }, (err: any, doc: any) => {
    try {
      if (!doc) {
        ticketDetails.save((err: any, doc: any) => {
          if (!err) {
            res.status(200).send(ticketDetails);
          } else {
            console.log("Error during record insertion : " + err);
            throw Error(err);
          }
        });
      } else {
        res.status(400).send({ message: "Ticket already exists!" });
      }
    } catch (err: any) {
      err.message = res.status(500).send({
        message: err.message || "An error occured while creating an agent.",
      });
    }
  });
});

ticketRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({ message: "Must provide correct params!" });
  }

  Ticket.findOneAndDelete({ _id: id }, (err: any, data: any) => {
    try {
      if (!data) {
        res.status(404).send({ message: "Ticket not found!" });
      } else {
        res.status(201).send("Ticket deleted!");
      }
    } catch (err) {
      res.status(500).send({ message: "Could not delete ticket.." });
    }
  });
});

export default ticketRouter;
