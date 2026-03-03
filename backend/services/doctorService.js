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
}

export default new DoctorService();
