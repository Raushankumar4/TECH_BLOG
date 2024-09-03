import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import { deleteVlog, postTheVlog } from "../controllers/post.controller.js";

const router = Router();

router
  .route("/create")
  .post(isAuthenticated, upload.single("postImage"), postTheVlog);
router.route("/delete/:id").delete(isAuthenticated, deleteVlog);

export default router;
