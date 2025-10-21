import PlaybackLog from "../model/PlaybackLog.js";
import AuditLog from "../model/AuditLog.js";

export const ListPlaybackLogs = async (req, res) => {
  try {
    const { tvId } = req.query;
    const filter = tvId ? { tvId } : {};
    const items = await PlaybackLog.find(filter)
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const CreatePlaybackLog = async (req, res) => {
  try {
    const log = new PlaybackLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const ListAuditLogs = async (_req, res) => {
  try {
    const items = await AuditLog.find().sort({ createdAt: -1 }).limit(200);
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const CreateAuditLog = async (req, res) => {
  try {
    const log = new AuditLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};


