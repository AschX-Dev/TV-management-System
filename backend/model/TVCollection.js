import mongoose from "mongoose";

const registeredTV = new mongoose.Schema(
  {
    tvId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    channelID: {
      type: String,
      default: "announcement",
    },
    tvModel: {
      type: String,
      required: true,
    },
    schedules: [],
    resolution: {
      type: String,
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    lastSeen: {
      type: Date,
    },

    tvSize: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const RegisteredTV = mongoose.model("RegisteredTV", registeredTV);
export default RegisteredTV;
