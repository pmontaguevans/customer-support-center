import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";

// routes
import homeRouter from "./routes/home";
import adminRouter from "./routes/customer-support";
import customerRouter from "./routes/customer";

dotenv.config();

if (!process.env.PORT) {
  console.log(`Error to get port`);
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);
const DB: string = process.env.DB_NAME!.toString();

const app: Express = express();
const server = createServer(app);
const io = new Server(server);

// TODO: refactor and integrate handshakes with client
io.on("connection", (socket) => {
  console.log("Connection established");
});

app.use(express.json());
app.use("/api/v1/home", homeRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/customer", customerRouter);

mongoose.set("strictQuery", false); // Prepare for Mongoose 7

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(DB);
}

server.listen(PORT, () => {
  console.log(`⚡️[server]: listening on port ${PORT}`);
});
