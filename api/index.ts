import express, { Express } from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";

// routes
import homeRouter from "./routes/home";
import supportRouter from "./routes/support";
import customerRouter from "./routes/customer";

dotenv.config();
const PORT = process.env.PORT;
const DB: any = process.env.DB_NAME;

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use("/api/v1/home", homeRouter);
app.use("/api/v1/admin", supportRouter);
app.use("/api/v1/customer", customerRouter);

mongoose.set("strictQuery", false); // Prepare for Mongoose 7

import Agent from "./models/Agent";
import Ticket from "./models/Ticket";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(DB);
}
// TODO: refactor and integrate handshakes with client
io.on("connection", (socket) => {
  console.log("Connection established");
});

server.listen(PORT, () => {
  console.log(`⚡️[server]: listening on port ${PORT}`);
});
