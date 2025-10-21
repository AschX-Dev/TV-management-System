import express from "express";
import {
  ValidateAdmin,
  RegisterAdmin,
  Login,
  CheckAuth,
  ForgotPassword,
  ResetPassword,
  Logout,
  SaveProfile,
  ChangePassword,
  UpdatePhoto,
  GetAllAdmin,
  DeleteAdmin,
  BlockAdmin,
  UnblockAdmin,
} from "../controllers/AdminController.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
const router = express.Router();
router.post("/validate-admin", ValidateAdmin);
router.post(
  "/register",
  verifyToken,
  authorizeRoles("SuperAdmin"),
  RegisterAdmin
);
router.get(
  "/get-all-admin",
  verifyToken,
  authorizeRoles("SuperAdmin"),
  GetAllAdmin
);
router.post("/login", Login);
router.post("/logout", verifyToken, Logout);
router.post("/check-auth", verifyToken, CheckAuth);
router.post("/forgot-password", ForgotPassword);
router.post("/reset-password/:token", ResetPassword);
router.post("/profile/save-profile", verifyToken, SaveProfile);
router.post("/profile/change-password", verifyToken, ChangePassword);
router.post("/profile/update-photo", verifyToken, UpdatePhoto);
router.post("/delete", verifyToken, authorizeRoles("SuperAdmin"), DeleteAdmin),
  router.post(
    "/block-admin",
    verifyToken,
    authorizeRoles("SuperAdmin"),
    BlockAdmin
  );
router.post(
  "/unblock-admin",
  verifyToken,
  authorizeRoles("SuperAdmin"),
  UnblockAdmin
);
export default router;
