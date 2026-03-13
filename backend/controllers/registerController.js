import { v2 as cloudinary } from "cloudinary";
import UserService from "../services/userService.js";
import DoctorService from "../services/doctorService.js";
import { validatePassword, hashPassword } from "../utility/password.js";
import { badRequest, conflict } from "../utility/response.js";

const createNewUser = async (req, res) => {
  // validate user roles
  const { email, password, roles, doctorFields } = req.body;

  if (![5684, 1973, 3956].includes(roles)) {
    return badRequest(res, `Invalid role specified, ${roles} is not allowed.`);
  }

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
    folder: "doctors",
  });

  const imageUrl = imageUpload.secure_url;

  try {
    // create doctor document
    if (roles === 1973) {
      if (!doctorFields) {
        return badRequest(res, "Doctor fields are required for doctor role");
      }
    }
    const doctorDoc = await DoctorService.createDoctorField({
      body: { ...doctorFields },
    });

    // hash the password
    const hashedPwd = await hashPassword(password);

    // createUserFields document
    const newUser = await UserService.createUserField(
      req,
      hashedPwd,
      imageUrl,
      doctorDoc._id,
    );

    const populatedUser = await UserService.populateUser(newUser._id);

    return created(res, populatedUser, "User Registered successfully☑️!");
  } catch (error) {
    return serverError(res, "Failed to Register new User", error);
  }
};

export default createNewUser;
