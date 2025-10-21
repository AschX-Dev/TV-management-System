import express from "express";
import bcryptjs from "bcryptjs";
import AdminModel from "../model/AdminModel.js";

const router = express.Router();

// ONE-TIME SETUP ROUTE - Remove after creating first admin
router.post("/create-first-admin", async (req, res) => {
  try {
    // Check if any admin exists
    const count = await AdminModel.countDocuments();
    if (count > 0) {
      return res
        .status(400)
        .json({ message: "Admin already exists. Use normal registration." });
    }

    const hashedPassword = await bcryptjs.hash("admin123", 10);

    const admin = new AdminModel({
      name: "Super Admin",
      ID: "ADMIN001",
      email: "admin@test.com",
      password: hashedPassword,
      role: "SuperAdmin",
      status: "Unblocked",
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: "Super Admin created successfully!",
      credentials: {
        email: "admin@test.com",
        password: "admin123",
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating admin", error: error.message });
  }
});

export default router;





