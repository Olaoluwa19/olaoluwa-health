import { v2 as cloudinary } from "cloudinary";
import DoctorService from "../services/doctorService.js";
import { hashPassword, validatePassword } from "../utility/password.js";
import { badRequest, created, serverError } from "../utility/response.js";

const createDoctor = async (req, res) => {
  try {
    const { password } = req.body;
    const role = 1973; // Default role for doctors

    if (password.length < 6) {
      return badRequest(res, "Password must be at least 6 characters");
    }
    if (!validatePassword(password)) {
      return badRequest(
        res,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      );
    }

    const hashedPwd = await hashPassword(password);

    // handles image upload
    const file = req.file;
    if (!file) {
      return badRequest(res, "Image file is required");
    }

    // Image upload to cloudinary
    const imageUpload = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
      folder: "doctors",
    });

    const imageUrl = imageUpload.secure_url;

    const doctor = await DoctorService.createDoctorField(
      req,
      hashedPwd,
      role,
      imageUrl,
    );

    return created(res, doctor, "Doctor created successfully");
  } catch (error) {
    return serverError(res, "Failed to create doctor", error);
  }
};

export { createDoctor };
