import ScreenGroup from "../model/ScreenGroup.js";
import NewTVModel from "../model/TVCollection.js";

export const CreateGroup = async (req, res) => {
  try {
    const { name, description, location, screenIds } = req.body;
    if (!name) return res.status(400).json({ message: "name required" });
    const exists = await ScreenGroup.findOne({ name });
    if (exists)
      return res.status(400).json({ message: "Group name already exists" });
    const group = new ScreenGroup({
      name,
      description,
      location,
      screenIds: screenIds || [],
    });
    await group.save();
    res.status(201).json(group);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const ListGroups = async (_req, res) => {
  try {
    const groups = await ScreenGroup.find();
    res.json(groups);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const UpdateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location, screenIds } = req.body;
    const group = await ScreenGroup.findByIdAndUpdate(
      id,
      { name, description, location, screenIds },
      { new: true }
    );
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const DeleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await ScreenGroup.findByIdAndDelete(id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};







