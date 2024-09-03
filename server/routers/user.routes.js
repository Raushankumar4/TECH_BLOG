// routes/userRoutes.js
import { Router } from "express";
import { upload } from "../middleware/multer.js";
import {
  changePassword,
  loginUser,
  logOut,
  registerUser,
  updateUserProofile,
  userProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

// Route to handle user registration with file upload
router.route("/register").post(upload.single("profileImage"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);
router.route("/profile/:id").get(isAuthenticated, userProfile);
router
  .route("/updateuserprofile/:id")
  .put(isAuthenticated, upload.single("profileImage"), updateUserProofile);
router.route("/updatepassword/:id").put(isAuthenticated, changePassword);

export default router;
