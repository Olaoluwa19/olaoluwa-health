import Doctor from "../models/doctorModel.js";
import { getImage } from "../utility/utils.js";

class DoctorService {
  constructor() {}

  static async createDoctorField(doctorData) {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = doctorData.body;
    // handles image upload
    const file = doctorData.file;
    if (!file) {
      throw new Error("Image file is required");
    }
    const imageUrl = await getImage(doctorData);

    const doctor = await Doctor.create({
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      imageUrl,
    });

    return doctor;
  }

  static async findUserById(userId) {
    return await Doctor.findOne({ _id: userId }).exec();
  }

  static async checkDuplicateUser(username, roles) {
    return await Doctor.findOne({ username: username, roles: roles }).exec();
  }

  static async findUserByEmailOrPhone(identifier) {
    return await Doctor.findOne({
      $or: [{ phone: identifier }, { email: identifier }],
    }).exec();
  }

  static async encryptPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  static async deleteUserFields(id) {
    return await Doctor.deleteOne(id);
  }
}

export default new DoctorService();
