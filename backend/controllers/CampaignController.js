import Campaign from "../model/Campaign.js";
import ScreenGroup from "../model/ScreenGroup.js";

export const CreateCampaign = async (req, res) => {
  try {
    const data = req.body;
    if (!data?.name || !data?.schedule?.startDateTime) {
      return res
        .status(400)
        .json({ message: "name and schedule.startDateTime required" });
    }
    const campaign = new Campaign(data);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const ListCampaigns = async (_req, res) => {
  try {
    const items = await Campaign.find();
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const GetCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Campaign.findById(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const UpdateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Campaign.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const DeleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Campaign.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const PauseCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Campaign.findByIdAndUpdate(
      id,
      { status: "Paused" },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const ResumeCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Campaign.findByIdAndUpdate(
      id,
      { status: "Active" },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};


