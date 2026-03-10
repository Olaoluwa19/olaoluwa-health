import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/doctorModel";
import {
  badRequest,
  forbidden,
  serverError,
  unauthorized,
} from "../utility/response";
import { evaluatePassword, generateAccessToken } from "../utility/password";

const handleDoctorLogin = async (req, res) => {
  const { phone, email, password } = req.body;

  // require email or phone for login
  const loginIdentifier = email || phone;
  if (!loginIdentifier)
    return badRequest(
      res,
      "Please provide your email or phone number to login.",
    );

  if (!password) return badRequest(res, "Password is required to login.");

  //   Check if user exists
  const foundDoctor = await Doctor.findDoctorByEmailOrPhone(loginIdentifier);

  if (!foundDoctor)
    return unauthorized(res, "The Doctor details provided does not exist"); // unauthorised

  if (foundDoctor.isSuspended)
    return forbidden(res, "Doctor is suspended from accessing the platform."); // forbidden

  // Evaluate password
  const match = evaluatePassword(password, foundDoctor.password);

  if (match) {
    const role = Object.values(foundDoctor.roles);

    //create JWT's
    const accessToken = generateAccessToken(foundDoctor, role);
    const refreshToken = generateRefreshToken(foundDoctor);

    // Saving refreshToken with current user
    foundDoctor.refreshToken = refreshToken;
    const doctor = await foundDoctor.save();
    const populatedDoctor = await Doctor.populatedDoctor(doctor._id);
    console.log(populatedDoctor);

    // set cookie with refresh token
    setRefreshTokenCookie(res, refreshToken);

    return created(res, "Login successful", {
      doctor: populatedDoctor,
      accessToken,
    });
  } else {
    return unauthorized(res, "Login failed. Invalid credentials.");
  }
};

module.exports = { handleDoctorLogin };
