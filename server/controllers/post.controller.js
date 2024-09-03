import { Vlog } from "../models/vlog.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

export const postTheVlog = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res
        .status(401)
        .json({ message: "all field are required", success: false });
    }
    let postImageurl = null;
    if (req.file) {
      const postImageLocalPath = req.file.path;
      const postImage = await uploadOnCloudinary(postImageLocalPath);
      postImageurl = postImage.url;
    }

    // now create post

    const postCreated = await Vlog.create({
      userId: id,
      description,
      postImage: postImageurl,
    });

    if (!postCreated) {
      return res
        .status(403)
        .json({ message: "Failed to create post", success: false });
    }
    return res.status(200).json({
      message: "Post Created Successfully !",
      postCreated,
      success: true,
    });
  } catch (error) {
    console.error(`Error While posting: ${error.message}`);
    return res.status(500).json({ message: "Error While posting" });
  }
};

// delete vlog

export const deleteVlog = async (req, res) => {
  try {
    const id = req.params.id;
    // Find the vlog by ID
    const post = await Vlog.findById(id);
    if (!post) {
      return res.status(404).json({ message: "No post found" });
    }

    // If the post has an image, delete it from Cloudinary
    if (post.postImage) {
      const urlParts = post.postImage.split("/");
      const filename = urlParts[urlParts.length - 1];
      const publicId = filename.split(".")[0];

      console.log("urlParts:", urlParts);
      console.log("filename:", filename);
      console.log("publicId:", publicId);

      const deleteResult = await deleteFromCloudinary(publicId);
      if (!deleteResult.success) {
        return res.status(500).json({
          message: `Failed to delete image from Cloudinary: ${deleteResult.error}`,
          success: false,
        });
      }
    }

    // Delete the vlog from MongoDB
    await Vlog.findByIdAndDelete(id);

    // Return success response
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(`Error while deleting post: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Internal server error while deleting post" });
  }
};
