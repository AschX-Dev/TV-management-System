import Layout from "../model/Layout.js";

export const CreateLayout = async (req, res) => {
  try {
    const data = req.body;
    if (!data?.name) return res.status(400).json({ message: "name required" });
    const exists = await Layout.findOne({ name: data.name });
    if (exists) return res.status(400).json({ message: "Layout name exists" });
    const layout = new Layout(data);
    await layout.save();
    res.status(201).json(layout);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const ListLayouts = async (_req, res) => {
  try {
    const items = await Layout.find();
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const UpdateLayout = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Layout.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const DeleteLayout = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Layout.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};







