import Doctor from "../models/doctorModel.js";

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

    if (!imageUrl) throw new Error("Image upload failed");
    if (!name || !email) throw new Error("Name & email required");

    const doctor = await Doctor.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      roles: [role],
      image: imageUrl,
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

export default DoctorService;
