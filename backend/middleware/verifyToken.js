import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Check for token in cookies OR Authorization header
  let token = req.cookies?.token;

  // If not in cookie, check Authorization header
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  console.log("🔐 Token check:", token ? "Token found" : "No token");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
    }

    req.userId = decoded.userId;
    console.log("✅ Token verified for user:", req.userId);
    next();
  } catch (error) {
    console.log("❌ Error in verifyToken:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - invalid token" });
  }
};
