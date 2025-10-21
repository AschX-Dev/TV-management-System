import NewTVModel from "../model/TVCollection.js";
import TVUploadedMedia from "../model/TVSharedMedia.js";
import { io } from "../socket/index.js";

export const RegisterTV = async (req, res) => {
  try {
    const { tvId, name, tvModel, tvSize, location, channelID, resolution } =
      req.body;

    if (!tvId || !tvModel || !tvSize || !location) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingTV = await NewTVModel.findOne({ tvId });
    if (existingTV) {
      return res.status(400).json({ message: "TV ID already registered!" });
    }

    const newTV = new NewTVModel({
      tvId,
      name,
      tvModel,
      tvSize,
      location,
      channelID,
      resolution,
    });
    await newTV.save();

    // Send success response
    res.status(201).json({ message: "TV registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

// Fetch all registered TVs
export const GetAllTVs = async (req, res) => {
  try {
    const tvs = await NewTVModel.find();
    res.status(200).json(tvs);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};
export const validateDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const tvExists = await NewTVModel.findOne({ tvId: deviceId });

    if (tvExists) {
      return res.json({ valid: true });
    } else {
      return res.json({ valid: false });
    }
  } catch (error) {
    console.error("Error validating device:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const DeleteTV = async (req, res) => {
  const { tvId } = req.params;
  try {
    const tv = await NewTVModel.findOne({ tvId: tvId });
    const isTVExistInShared = await TVUploadedMedia.findOne({ tvId: tvId });
    if (!tv) {
      return res.status(404).json({ message: "TV not found" });
    }

    await NewTVModel.findByIdAndDelete(tv._id);
    if (isTVExistInShared) {
      await TVUploadedMedia.deleteMany({ tvId: tvId });
    }
    res.status(200).json({ message: "TV deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};
export const CurrentMedia = async (req, res) => {
  const tvId = req.params.tvId;
  try {
    const media = await TVUploadedMedia.findOne({ tvId }).sort({
      createdAt: -1,
    });
    if (media) {
      res.status(200).json({ mediaUrl: media.mediaUrl });
    } else {
      res.status(404).json({ error: `No media found for TV ID: ${tvId}` });
    }
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const PushNow = async (req, res) => {
  try {
    const { tvId, mediaUrl } = req.body;
    if (!tvId || !mediaUrl)
      return res.status(400).json({ message: "tvId and mediaUrl required" });
    io.to(tvId).emit("mediaUpdate", { mediaUrl });
    await TVUploadedMedia.create({ tvId, mediaUrl });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const RemoteCommand = async (req, res) => {
  try {
    const { tvId, command } = req.body; // 'pause' | 'resume' | 'reboot'
    if (!tvId || !command)
      return res.status(400).json({ message: "tvId and command required" });
    io.to(tvId).emit("deviceCommand", { command });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const UpdateTV = async (req, res) => {
  const { tvId } = req.params;
  const { name, tvModel, tvSize, location, channelID, resolution } = req.body;
  try {
    const tv = await NewTVModel.findOneAndUpdate(
      { tvId },
      { name, tvModel, tvSize, location, channelID, resolution },
      { new: true }
    );
    if (!tv) return res.status(404).json({ message: "TV not found" });
    res.status(200).json(tv);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

export const Heartbeat = async (req, res) => {
  try {
    const { tvId, resolution } = req.body;
    if (!tvId) return res.status(400).json({ message: "tvId required" });
    const tv = await NewTVModel.findOneAndUpdate(
      { tvId },
      {
        status: "online",
        lastSeen: new Date(),
        ...(resolution ? { resolution } : {}),
      },
      { new: true }
    );
    if (!tv) return res.status(404).json({ message: "TV not found" });
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
