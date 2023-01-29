import express, { Request, Response } from "express";
const supportRouter = express.Router();

supportRouter.get("/", (req: Request, res: Response) => {
  res.status(201).json({ message: "admin page reached!" });
});

export default supportRouter;
