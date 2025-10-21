import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import {
  CreateAuditLog,
  CreatePlaybackLog,
  ListAuditLogs,
  ListPlaybackLogs,
} from "../controllers/LogController.js";

const router = express.Router();

router.get("/playback", verifyToken, ListPlaybackLogs);
router.post("/playback", CreatePlaybackLog); // called by players

router.get("/audit", verifyToken, authorizeRoles("SuperAdmin"), ListAuditLogs);
router.post("/audit", verifyToken, CreateAuditLog);

export default router;


