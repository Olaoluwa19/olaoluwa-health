import Doctor from "../models/doctorModel.js";
import validator from "validator";

class DoctorService {
  constructor() {}

  static async createDoctorField(request, hashPassword, role, imageUrl) {
    const {
      name,
      email,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = request.body;

    // Basic validations
    if (!imageUrl) throw new Error("Image upload failed");
    if (!name || !email) throw new Error("Name & email required");
    // Simple email format validation
    if (!validator.isEmail(email)) throw new Error("Invalid email format");

    const doctor = await Doctor.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees),
      address: JSON.parse(address),
      roles: [role],
      image: imageUrl,
    });

    return doctor;
  }

  static async findDoctorById(userId) {
    return await Doctor.findOne({ _id: userId }).exec();
  }

  static async checkDuplicateDoctor(username, roles) {
    return await Doctor.findOne({ username: username, roles: roles }).exec();
  }

  static async findDoctorByEmailOrPhone(identifier) {
    return await Doctor.findOne({
      $or: [{ phone: identifier }, { email: identifier }],
    }).exec();
  }

  static async encryptPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  static async deleteDeleteFields(id) {
    return await Doctor.deleteOne(id);
  }

  static async populateDoctor(id) {
    return await Doctor.findById(id).select(
      "-password -refreshToken -createdAt -updatedAt",
    );
  }
}

export default DoctorService;
