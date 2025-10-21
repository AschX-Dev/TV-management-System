import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { connectDB } from "./db/ConnectDB.js";
import { app, server } from "./socket/index.js";
import mediaRoutes from "./routes/MediaRoutes.js";
import TVRoutes from "./routes/TVRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import ScheduleRoutes from "./routes/ScheduleRoutes.js";
import GroupRoutes from "./routes/GroupRoutes.js";
import CampaignRoutes from "./routes/CampaignRoutes.js";
import LayoutRoutes from "./routes/LayoutRoutes.js";
import LogRoutes from "./routes/LogRoutes.js";
import SetupRoutes from "./routes/SetupRoutes.js";

dotenv.config();

// Debug environment
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
console.log("Loaded PORT:", process.env.PORT);

// Middleware
app.use(
  cors({
    origin: [
      "https://tvmsall.vercel.app/",
      "https://tvmsfb-mint.onrender.com",
      "https://tvms-mint.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://192.168.100.150:3000",
      "http://169.254.61.163:3000",
    ],
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(express.json());

// Use mediaRoutes as a middleware
app.use("/api/media", mediaRoutes);
app.use("/api/tv", TVRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/schedule", ScheduleRoutes);
app.use("/api/groups", GroupRoutes);
app.use("/api/campaigns", CampaignRoutes);
app.use("/api/layouts", LayoutRoutes);
app.use("/api/logs", LogRoutes);
app.use("/api/setup", SetupRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
