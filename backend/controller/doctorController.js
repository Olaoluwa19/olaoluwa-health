import DoctorService from "../services/doctorService";
import { InternalError } from "../utility/response";

const createDoctor = async (req, res) => {
  try {
  } catch (error) {
    return InternalError(res, error);
  }
};
