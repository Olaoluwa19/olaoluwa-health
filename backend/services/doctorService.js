import Doctor from "../models/doctorModel.js";

class DoctorService {
  constructor() {}

  static async createDoctorField(request) {
    const { speciality, degree, experience, about, available } = request.body;

    const doctor = await Doctor.create({
      speciality,
      degree,
      experience,
      about,
      available,
    });

    return doctor;
  }

  static async findDoctorById(userId) {
    return await Doctor.findOne({ _id: userId }).exec();
  }

  static async deleteDoctorFields(id) {
    return await Doctor.deleteOne(id);
  }

  static async populateDoctor(id) {
    return await Doctor.findById(id).select(
      "-password -refreshToken -createdAt -updatedAt",
    );
  }
}

export default DoctorService;
