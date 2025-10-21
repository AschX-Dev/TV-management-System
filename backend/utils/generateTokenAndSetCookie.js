import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Use different cookie settings for development vs production
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: false, // Set to false for development to allow cross-port cookies
    sameSite: isProduction ? "none" : "none", // "none" allows cross-port (3000 → 3002)
    secure: false, // false for development HTTP
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    path: "/",
  });

  console.log("🍪 Cookie set for user:", userId);
  return token;
};
