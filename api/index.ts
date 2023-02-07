import express, { Express } from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// routes
import adminRouter from "./routes/admin";
import ticketRouter from "./routes/tickets";

dotenv.config();

const PORT: number = parseInt(process.env.PORT!);
const DB: string = process.env.DB_NAME!.toString();

const app: Express = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use("/api/v1/agents", adminRouter);
app.use("/api/v1/tickets", ticketRouter);
app.use("api/v1", express.Router());

mongoose.set("strictQuery", false); // Prepare for Mongoose 7

async function main() {
  await mongoose.connect(DB);
}
main().catch((err) => console.log(err));

server.listen(PORT, () => {
  console.log(`⚡️[server]: listening on port ${PORT}`);
});
