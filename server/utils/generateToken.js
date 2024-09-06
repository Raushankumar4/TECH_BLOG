import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Function to generate a JWT token
const generateToken = (user) => {
  const tokenData = { user };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });
  return token;
};

// Function to set a cookie with the JWT token
const setTokenCookie = (res, token) => {
  return res.cookie("token", token, {
    httpOnly: true, // Ensures that the cookie cannot be accessed via JavaScript
    secure: process.env.NODE_ENV === "production", // Ensures cookie is sent only over HTTPS
    sameSite: "Strict", // Helps protect against CSRF attacks
    maxAge: 2 * 24 * 60 * 60 * 1000, // Cookie expires in 2 days (in milliseconds)
  });
};

// Function to remove the JWT cookie
const removeTokenCookie = (res) => {
  return res.cookie("token", "", {
    httpOnly: true, // Ensures that the cookie cannot be accessed via JavaScript
    secure: process.env.NODE_ENV === "production", // Ensures cookie is sent only over HTTPS
    sameSite: "Strict", // Helps protect against CSRF attacks
    maxAge: 0, // Cookie expires immediately
  });
};

export { generateToken, setTokenCookie, removeTokenCookie };
