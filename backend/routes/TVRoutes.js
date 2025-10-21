import express from "express";
import {
  CurrentMedia,
  DeleteTV,
  GetAllTVs,
  RegisterTV,
  validateDevice,
  Heartbeat,
  UpdateTV,
  PushNow,
  RemoteCommand,
} from "../controllers/TVController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
const router = express.Router();
router.post(
  "/register-tv",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin"),
  RegisterTV
);
router.get("/all", verifyToken, GetAllTVs);
router.post(
  "/delete/:tvId",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin"),
  DeleteTV
);
router.post(
  "/update/:tvId",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin"),
  UpdateTV
);
router.get("/display/:tvId", CurrentMedia);

router.get("/validate-device/:deviceId", validateDevice);
router.post("/heartbeat", Heartbeat);
router.post(
  "/push-now",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin", "ContentManager"),
  PushNow
);
router.post(
  "/command",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin"),
  RemoteCommand
);

export default router;
