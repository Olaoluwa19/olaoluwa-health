import express from "express";
import { createDoctor } from "../../controllers/doctorController.js";
import upload from "../../middleware/multer.js";

const adminRouter = express.Router();

adminRouter.route("/").post(upload.single("image"), createDoctor);

export default adminRouter;
