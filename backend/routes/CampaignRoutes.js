import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import {
  CreateCampaign,
  DeleteCampaign,
  GetCampaign,
  ListCampaigns,
  PauseCampaign,
  ResumeCampaign,
  UpdateCampaign,
} from "../controllers/CampaignController.js";

const router = express.Router();

router.get("/", verifyToken, ListCampaigns);
router.get("/:id", verifyToken, GetCampaign);
router.post(
  "/",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin", "ContentManager"),
  CreateCampaign
);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin", "ContentManager"),
  UpdateCampaign
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin"),
  DeleteCampaign
);
router.post(
  "/:id/pause",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin"),
  PauseCampaign
);
router.post(
  "/:id/resume",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin"),
  ResumeCampaign
);

export default router;







