import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import AdminModel from "../model/AdminModel.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: join(__dirname, "../.env") });

async function createSuperAdmin() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existing = await AdminModel.findOne({ email: "admin@test.com" });
    if (existing) {
      console.log("⚠️  Admin already exists with email: admin@test.com");
      console.log("ℹ️  Email: admin@test.com");
      console.log("ℹ️  Password: admin123");
      process.exit(0);
    }

    console.log("🔐 Hashing password...");
    const hashedPassword = await bcryptjs.hash("admin123", 10);

    console.log("👤 Creating Super Admin...");
    const admin = new AdminModel({
      name: "Super Admin",
      ID: "ADMIN001",
      email: "admin@test.com",
      password: hashedPassword,
      role: "SuperAdmin",
      status: "Unblocked",
    });

    await admin.save();

    console.log("\n╔══════════════════════════════════════╗");
    console.log("║   ✅ Super Admin Created!            ║");
    console.log("╠══════════════════════════════════════╣");
    console.log("║ Email: admin@test.com                ║");
    console.log("║ Password: admin123                   ║");
    console.log("║ Role: SuperAdmin                     ║");
    console.log("╚══════════════════════════════════════╝\n");

    console.log("🎉 You can now login to the dashboard!");
    console.log("📍 URL: http://localhost:3000/auth/login\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createSuperAdmin();







