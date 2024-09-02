// routes/userRoutes.js
import { Router } from "express";
import { upload } from "../middleware/multer.js";
import {
  loginUser,
  logOut,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

// Route to handle user registration with file upload
router.route("/register").post(upload.single("profileImage"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);

export default router;
