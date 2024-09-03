import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    // extrat token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token provided ,User not authenticated" });
    }

    // extract token value from header

    const token = authHeader.split(" ")[1];

    // verify token

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user to request object

    req.user = decoded.user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        res.status(401).json({ message: "User session has expired" })
      );
    }
    if (error.name === "JsonWebTokenError") {
      return next(res.status(500).json({ message: "The token is not valid" }));
    }
    return next(
      res
        .status(403)
        .json({ message: "An error occurred during authentication" })
    );
  }
};
