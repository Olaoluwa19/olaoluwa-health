import express from "express";
import root from "./root.js";
import adminRouter from "./api/doctorRoute.js";
import registerRouter from "./register.js";
import LoginRouter from "./login.js";

const api = express.Router();

// Define API routes here
api.use("/", root);
api.use("/register", registerRouter);
api.use("/login", LoginRouter);
api.use("/admin", adminRouter);

export default api;
