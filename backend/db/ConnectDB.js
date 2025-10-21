import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("✅ DataBase Connected Successfully!");
    console.log("📊 Database Name:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error("   Message:", error.message);

    if (error.message.includes("ETIMEDOUT")) {
      console.error("\n💡 Troubleshooting:");
      console.error("   1. Check your internet connection");
      console.error("   2. Whitelist your IP in MongoDB Atlas:");
      console.error("      - Go to https://cloud.mongodb.com");
      console.error(
        "      - Network Access → Add IP → Allow from Anywhere (0.0.0.0/0)"
      );
      console.error("   3. Verify MONGO_URI in .env file");
    }

    process.exit(1);
  }
};
