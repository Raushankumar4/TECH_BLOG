// routes/userRoutes.js
import { Router } from "express";
import { upload } from "../middleware/multer.js";
import {
  changePassword,
  contactUs,
  getOtherUsers,
  getSavedPosts,
  loginUser,
  logOut,
  registerUser,
  savePost,
  unsavePost,
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
router.route("/savepost/:postId").post(isAuthenticated, savePost);
router.route("/unsavepost").post(isAuthenticated, unsavePost);
router.route("/getsavedPost/:userId").get(isAuthenticated, getSavedPosts);
router.route("/getotherusers/:id").get(isAuthenticated, getOtherUsers);
router.route("/contactus").post(contactUs);

export default router;
