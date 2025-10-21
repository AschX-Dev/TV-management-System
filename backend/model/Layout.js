import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    size: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    widget: {
      type: String,
      enum: ["media", "text", "ticker", "clock", "web"],
      default: "media",
    },
    props: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false }
);

const layoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    resolution: { type: String },
    zones: { type: [zoneSchema], default: [] },
  },
  { timestamps: true }
);

const Layout = mongoose.model("Layout", layoutSchema);
export default Layout;


