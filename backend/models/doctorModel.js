import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    fees: { type: Number, required: true },
    available: { type: Boolean, default: true },
    slots_booked: { type: Object, default: {} },
  },
  { timestamps: true },
  { minimize: false },
);

const Doctor = mongoose.models.doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
