import Doctor from "../models/Doctor.js";

class DoctorService {
  constructor() {}
  static async createDoctor(doctorData) {
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
    } = doctorData;
    const doctor = new Doctor({
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    });
    await doctor.save();
    return doctor;
  }
}

export default new DoctorService();
