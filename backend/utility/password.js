import bcrypt from "bcryptjs";

const validatePassword = (password) => {
  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
  return regex.test(password);
};

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export { validatePassword, encryptPassword };
