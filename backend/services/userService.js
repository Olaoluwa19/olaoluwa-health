import User from "../models/userModel.js";
import validator from "validator";

class UserService {
  constructor() {}

  static async createUserField(
    request,
    hashedPassword,
    imageUrl,
    doctorFieldId,
  ) {
    const { name, email, phone, gender, dob, fees, address, role } =
      request.body;

    // Basic validations
    if (!imageUrl) throw new Error("Image upload failed");
    if (!name || !email) throw new Error("Name & email required");
    // Simple email format validation
    if (!validator.isEmail(email)) throw new Error("Invalid email format");

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone,
      gender,
      dob,
      fees: Number(fees),
      address: JSON.parse(address),
      roles: [role], // Ensure roles is an array
      image: imageUrl,
      doctorFields: doctorFieldId || null, // Link to doctorFields if applicable
    });

    return user;
  }

  static async findUserById(userId) {
    return await User.findOne({ _id: userId }).exec();
  }

  static async checkDuplicateUser(email, roles) {
    return await User.findOne({ email, roles }).exec();
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
