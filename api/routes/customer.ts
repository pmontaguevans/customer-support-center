import express, { Request, Response } from "express";
const customerRouter = express.Router();

customerRouter.get("/", (req: Request, res: Response) => {
  res.status(201).json({ message: "Customer router reached!" });
});

export default customerRouter;
