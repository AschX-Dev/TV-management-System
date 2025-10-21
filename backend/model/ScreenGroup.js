import mongoose from "mongoose";

const screenGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    location: { type: String },
    screenIds: { type: [String], default: [] }, // tvId references
  },
  { timestamps: true }
);

const ScreenGroup = mongoose.model("ScreenGroup", screenGroupSchema);
export default ScreenGroup;






