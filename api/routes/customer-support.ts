import express, { Request, Response } from "express";
import { IAgent } from "../services/interfaces";
import Agent from "../models/Agent";

const adminRouter = express.Router();

adminRouter.get("/agents", (req: Request, res: Response) => {
  Agent.find({}, (err: any, agents: IAgent[]) => {
    res.status(200).send({ agents });
  });
});

adminRouter.post("/agents", (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name field cannot be empty." });
    return;
  }

  const agentDetails = new Agent({
    name: req.body.name,
  });

  Agent.exists({ name: req.body.name }, function (err, doc) {
    try {
      if (!doc) {
        agentDetails.save((err: any, doc) => {
          if (!err) {
            res.status(200).send(agentDetails);
          } else {
            console.log("Error during record insertion : " + err);
            throw Error(err);
          }
        });
      } else {
        res.status(400).send({ message: "Agent already exists!" });
      }
    } catch (err: any) {
      res.status(500).send({
        message: err.message || "An error occured while creating an agent.",
      });
    }
  });
});

adminRouter.put("/agents/:id", (req: Request<{ id: any }>, res: Response) => {
  // TODO: refactor later
  const isEmpty = Object.keys(req.body).length === 0;

  if (isEmpty) {
    return res.status(400).send({ message: "Cannot update with empty data" });
  }

  const { id } = req.params;

  const updateAgent: IAgent = {
    name: req.body.name,
    ticketId: req.body.ticketId || null,
  };
  Agent.findOneAndUpdate(id, updateAgent, (err: any, data: any) => {
    try {
      if (!data) {
        res.status(404).send({
          message: "Agent not found..",
        });
      } else {
        res.send({ message: "Agent was successfully updated." });
      }
    } catch (err) {
      res.status(500).send({ message: "Error updating agent with id=" + id });
    }
  });
});

adminRouter.delete(
  "/agents/:id",
  (req: Request<{ id: any }>, res: Response) => {
    Agent.findOneAndDelete({ _id: req.params.id }, (err: any, data: any) => {
      console.log("data", data);
      try {
        if (!data) {
          res.status(404).send({ message: "Agent not found!" });
        } else {
          res.status(201).send("Agent deleted!");
        }
      } catch (err) {
        res.status(500).send({ message: "Could not delete agent.." });
      }
    });
  }
);

export default adminRouter;
