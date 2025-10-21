import express from "express";
import {
  CreateGroup,
  DeleteGroup,
  ListGroups,
  UpdateGroup,
} from "../controllers/GroupController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/", verifyToken, ListGroups);
router.post(
  "/",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin"),
  CreateGroup
);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin"),
  UpdateGroup
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("SuperAdmin", "RegionalAdmin"),
  DeleteGroup
);

export default router;


