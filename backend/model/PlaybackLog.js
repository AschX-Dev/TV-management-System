import mongoose from "mongoose";

const playbackLogSchema = new mongoose.Schema(
  {
    tvId: { type: String, required: true },
    mediaId: { type: String },
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date },
    status: {
      type: String,
      enum: ["started", "completed", "error"],
      default: "started",
    },
    error: { type: String },
  },
  { timestamps: true }
);

const PlaybackLog = mongoose.model("PlaybackLog", playbackLogSchema);
export default PlaybackLog;


