import express from "express";
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.status(201).json({ message: "Home route reached!" });
});

export default homeRouter;
