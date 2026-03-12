import { badRequest } from "../utility/response";

const createNewUser = async (req, res) => {
  // validate user roles
  const { username, password, roles, address } = req.body;

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
    return serverError(res, error);
  }
};

export default createNewUser;
