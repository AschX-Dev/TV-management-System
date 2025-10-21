import AdminModel from "../model/AdminModel.js";

export const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      const user = await AdminModel.findById(userId).select("role status");
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      if (user.status === "Blocked") {
        return res
          .status(403)
          .json({ success: false, message: "Account is blocked" });
      }
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }
      req.userRole = user.role;
      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
};


