import express from "express";
import { config } from "./config/config.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to the OrderPilot API!");
});

app.listen(config.port, () => {
  console.log(`Server is up and running on ${config.port}`);
});
