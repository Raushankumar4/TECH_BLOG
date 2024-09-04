import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import {
  deleteVlog,
  getAllPosts,
  getMyPosts,
  postTheVlog,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router
  .route("/create")
  .post(isAuthenticated, upload.single("postImage"), postTheVlog);
router.route("/delete/:id").delete(isAuthenticated, deleteVlog);
router
  .route("/update/:id")
  .put(isAuthenticated, upload.single("postImage"), updatePost);
router.route("/myposts/:id").get(isAuthenticated, getMyPosts);
router.route("/allposts").get(isAuthenticated, getAllPosts);

export default router;
