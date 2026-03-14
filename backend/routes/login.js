import express from "express";
const loginRouter = express.Router();
import handleLogin from "../controllers/authController.js";

loginRouter.post("/", handleLogin);

export default loginRouter;
