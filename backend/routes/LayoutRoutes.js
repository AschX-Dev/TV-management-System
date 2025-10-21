import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import {
  CreateLayout,
  DeleteLayout,
  ListLayouts,
  UpdateLayout,
} from "../controllers/LayoutController.js";

const router = express.Router();

router.get("/", verifyToken, ListLayouts);
router.post(
  "/",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin", "ContentManager"),
  CreateLayout
);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin", "ContentManager"),
  UpdateLayout
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin"),
  DeleteLayout
);

export default router;


