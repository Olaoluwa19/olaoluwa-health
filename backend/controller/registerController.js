import { badRequest } from "../utility/response";

const createNewUser = async (req, res) => {
  // validate user roles
  if (![5684, 1973, 3956].includes(roles)) {
    return badRequest(res, "Invalid role specified");
  }

  // check if password length greater than 6
  if (password.length < 6) {
    return responseMessage(
      res,
      400,
      false,
      "Password must be at least 6 characters",
    );
  }

  // check if password matches regex
  if (!validatePassword(password)) {
    return responseMessage(
      res,
      400,
      false,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    );
  }

  // check for duplicate user

  const duplicate = await checkDuplicateUser(username, roles);

  if (duplicate) {
    return responseMessage(
      res,
      409,
      false,
      "User already exists. Please login.",
    );
    // conflict
  }

  try {
    // create address document
    const addressDoc = await createAddress({ body: { ...address } });

    // encrypt the password
    const hashedPwd = await encryptPassword(password);

    // createUserFields document
    const newUser = await createUserFields(req, hashedPwd, addressDoc._id);

    const populatedUser = await getPopulatedUser(newUser._id);

    console.log(populatedUser);
    return res.status(201).json(populatedUser);
  } catch (error) {
    return serverErrorMessage(res, error);
  }
};
