import express from "express";
import http from "http";
import mongoose from "mongoose";
const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get("/", (req, res) => {
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

const port = 4000;
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
