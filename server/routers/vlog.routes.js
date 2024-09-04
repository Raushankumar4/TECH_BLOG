import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import {
  addComment,
  deleteComment,
  deleteVlog,
  getAllPosts,
  getComments,
  getMyPosts,
  postTheVlog,
  updateComment,
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
router.route("/comment").post(isAuthenticated, addComment);
router.route("/comment/:vlogId").get(isAuthenticated, getComments);
router
  .route("/deletecomment/:commentId")
  .delete(isAuthenticated, deleteComment);
router.route("/updatecomment/:commentId").put(isAuthenticated, updateComment);

export default router;
