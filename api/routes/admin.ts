import express, { Request, Response } from "express";
import { IAgent } from "../services/interfaces";
import Agent from "../models/Agent";

const adminRouter = express.Router();

adminRouter.get("/", (req: Request, res: Response) => {
  Agent.find({}, (err: any, agents: IAgent[]) => {
    try {
      res.status(200).send(agents);
    } catch (err: any) {
      res.status(500).send({
        message: err.message || "An error occured while retrieving agents.",
      });
    }
  });
});

adminRouter.get("/:id", (req: Request, res: Response) => {
  Agent.findOne({ _id: req.params.id }, (err: any, agent: IAgent) => {
    try {
      res.status(200).send(agent);
    } catch (err: any) {
      res.status(500).send({
        message: err.message || "An error occured while retrieving agents.",
      });
    }
  });
});

adminRouter.post("/", (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: "Name field cannot be empty." });
    return;
  }

  const agentDetails = new Agent({ name });

  Agent.exists({ name }, (err, doc) => {
    try {
      if (!doc) {
        agentDetails.save((err: any, doc) => {
          if (!err) {
            res.status(200).send(agentDetails);
          } else {
            console.log("Error during record insertion : " + err);
            throw new Error(err);
          }
        });
      } else {
        res.status(400).send({ message: "Agent already exists!" });
      }
    } catch (err: any) {
      err.message = res.status(500).send({
        message: err.message || "An error occured while creating an agent.",
      });
    }
  });
});

adminRouter.put("/:id", (req: Request<{ id: string }>, res: Response) => {
  if (!req.body) {
    return res.status(400).send({ message: "Cannot update with empty data" });
  }

  const { id } = req.params;

  Agent.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true },
    (err: any, doc: any) => {
      try {
        if (!doc) {
          res.status(404).send({
            message: "Agent not found..",
          });
        } else {
          console.log("here", doc);
          return res.send({
            agent: doc,
            message: "Agent was successfully updated.",
          });
        }
      } catch (err) {
        return res
          .status(500)
          .send({ message: "Error updating agent with id: " + id });
      }
    }
  );
});

adminRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  Agent.findOneAndDelete({ _id: id }, (err: any, data: IAgent) => {
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
});

export default adminRouter;
