import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    mediaItems: [
      {
        mediaId: { type: String, required: true },
        durationSeconds: { type: Number },
        order: { type: Number, default: 0 },
      },
    ],
    targetScreens: { type: [String], default: [] }, // tvIds
    targetGroups: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ScreenGroup",
      default: [],
    },
    priority: { type: Number, default: 1 },
    schedule: {
      startDateTime: { type: Date, required: true },
      endDateTime: { type: Date },
      recurrence: {
        type: String,
        enum: ["none", "daily", "weekly", "monthly"],
        default: "none",
      },
    },
    status: {
      type: String,
      enum: [
        "Draft",
        "Scheduled",
        "Active",
        "Paused",
        "Completed",
        "Cancelled",
      ],
      default: "Draft",
    },
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;






