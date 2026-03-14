import { v2 as cloudinary } from "cloudinary";
import UserService from "../services/userService.js";
import DoctorService from "../services/doctorService.js";
import { validatePassword, hashPassword } from "../utility/password.js";
import {
  badRequest,
  conflict,
  serverError,
  created,
} from "../utility/response.js";

const createNewUser = async (req, res) => {
  // validate user roles
  const { email, password, roles, doctorsField } = req.body;

  // check if password length greater than 6
  if (password.length < 6) {
    return badRequest(res, "Password must be at least 6 characters");
  }

  // check if password matches regex
  if (!validatePassword(password)) {
    return badRequest(
      res,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    );
  }

  // check for duplicate user
  const duplicate = await UserService.checkDuplicateUser(email, roles);

  if (duplicate) {
    return conflict(res, "User already exists. Please login."); // conflict
  }

  // handles image upload
  const file = req.file;
  if (!file) {
    return badRequest(res, "Image file is required");
  }

  // Image upload to cloudinary
  const imageUpload = await cloudinary.uploader.upload(file.path, {
    resource_type: "image",
    folder: "users",
  });

  const imageUrl = imageUpload.secure_url;

  try {
    // create doctor document
    if (roles === 1973) {
      if (!doctorsField) {
        return badRequest(res, "Doctor fields are required for doctor role");
      }
    }
    if (roles === 5684 || roles === 3956) {
      if (doctorsField) {
        return badRequest(
          res,
          "Doctor fields should not be provided for non-doctor roles",
        );
      }
    }
    const doctorDoc = await DoctorService.createDoctorField({
      body: { ...doctorsField },
    });

    // hash the password
    const hashedPwd = await hashPassword(password);

    // createUserFields document
    const newUser = await UserService.createUserField(
      req,
      hashedPwd,
      doctorDoc._id,
      imageUrl,
    );

    const populatedUser = await UserService.populateUser(newUser._id);

    return created(res, populatedUser, "User Registered successfully☺️☑️!");
  } catch (error) {
    return serverError(res, "Failed to Register new User😔❌", error);
  }
};

export default createNewUser;
