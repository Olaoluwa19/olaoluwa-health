import express from "express";
const registerRouter = express.Router();
import createNewUser from "../controllers/registerController.js";

registerRouter.post("/", createNewUser);

export default registerRouter;
