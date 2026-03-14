import User from "../models/userModel.js";
import UserService from "../services/userService.js";
import {
  badRequest,
  forbidden,
  unauthorized,
  created,
} from "../utility/response.js";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
} from "../utility/password.js";

const handleUserLogin = async (req, res) => {
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
  const foundUser = await UserService.findUserByEmailOrPhone(loginIdentifier);

  if (!foundUser)
    return unauthorized(res, "The User details provided does not exist"); // unauthorised

  if (foundUser.isSuspended)
    return forbidden(res, "User is suspended from accessing the platform😡!"); // forbidden

  // Evaluate password
  const match = comparePassword(password, foundUser.password);

  if (match) {
    const role = Object.values(foundUser.roles);

    //create JWT's
    const accessToken = generateAccessToken(foundUser, role);
    const refreshToken = generateRefreshToken(foundUser);

    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const user = await foundUser.save();
    const populatedUser = await UserService.populateUser(user._id);
    console.log(populatedUser);

    // set cookie with refresh token
    setRefreshTokenCookie(res, refreshToken);

    return created(
      res,
      {
        accessToken,
        user: populatedUser,
      },
      "Login successful☺️🔓",
    );
  } else {
    return unauthorized(res, "Login failed😔! Invalid credentials🗝️.");
  }
};

export default handleUserLogin;
