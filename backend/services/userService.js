import User from "../models/userModel.js";
import validator from "validator";

class UserService {
  constructor() {}

  static async createUserField(request, hashPassword, role, imageUrl) {
    const { name, email, phone, roles, gender, dob, fees, address } =
      request.body;

    // Basic validations
    if (!imageUrl) throw new Error("Image upload failed");
    if (!name || !email) throw new Error("Name & email required");
    // Simple email format validation
    if (!validator.isEmail(email)) throw new Error("Invalid email format");

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashPassword,
      phone,
      roles,
      gender,
      dob,
      fees: Number(fees),
      address: JSON.parse(address),
      roles: [roles], // Ensure roles is an array
      image: imageUrl,
    });

    return user;
  }

  static async findUserById(userId) {
    return await User.findOne({ _id: userId }).exec();
  }

  static async checkDuplicateUser(username, roles) {
    return await User.findOne({ username, roles }).exec();
  }

  static async findUserByEmailOrPhone(identifier) {
    return await User.findOne({
      $or: [{ phone: identifier }, { email: identifier }],
    }).exec();
  }

  static async deleteDeleteFields(id) {
    return await User.deleteOne(id);
  }

  static async populateUser(id) {
    return await User.findById(id)
      .populate({
        path: "doctorFields",
        select: "-password -refreshToken -createdAt -updatedAt",
      })
      .exec();
  }
}

export default UserService;
