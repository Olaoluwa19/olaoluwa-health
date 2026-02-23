import express from "express";
import cors from "cors";

// app config
const app = express();

// midlleware
app.use(express.json());
app.use(cors());

// api endpoints
app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;
