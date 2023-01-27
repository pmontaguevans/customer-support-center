import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";

dotenv.config();
const PORT = process.env.PORT;

const app: Express = express();
const server = http.createServer(app);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello world</h1>");
});

// DeprecationWarning: Mongoose: the `strictQuery` option
// will be switched back to `false` by default in Mongoose 7.
mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb://localhost:27017/upcoming_db_name",
  //@ts-ignore
  // Added option to avoid deprecation warning
  { useNewUrlParser: true },
  () => {
    console.log("Successfully connected to database");
  }
);

// uncomment below when testing application and comment out line 7
// const PORT = 4000;
server.listen(PORT, () => {
  console.log(`⚡️[server]: listening on port ${PORT}`);
});
