import express from "express";
import root from "./root.js";
import adminRouter from "./api/doctorRoute.js";

const api = express.Router();

// Define API routes here
api.use("/", root);
api.use("/admin", adminRouter);

export default api;
