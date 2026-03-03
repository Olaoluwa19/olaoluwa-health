import DoctorService from "../services/doctorService.js";
import { CreatedResponse, InternalError } from "../utility/response.js";

const createDoctor = async (req, res) => {
  try {
    const doctor = await DoctorService.createDoctorField(req);

    return CreatedResponse(doctor, 201);
  } catch (error) {
    return InternalError(error);
  }
};

export { createDoctor };
