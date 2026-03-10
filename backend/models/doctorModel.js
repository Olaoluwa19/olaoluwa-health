import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    slots_booked: { type: Object, default: {} },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
  { minimize: false },
);

const Doctor = mongoose.models.doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
