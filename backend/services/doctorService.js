import Doctor from "../models/doctorModel.js";

class DoctorService {
  constructor() {}

  static async createDoctorField(request) {
    const { speciality, degree, experience, about, fees, available } =
      request.body;

    const doctor = await Doctor.create({
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees),
      available,
    });

    return doctor;
  }
}

export default DoctorService;
