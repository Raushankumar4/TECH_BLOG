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

// updatepost

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { description } = req.body;

  if (!description) {
    return res
      .status(401)
      .json({ message: "Description field required", success: false });
  }

  // Initialize variables for new image upload
  let postImageUrl = null;
  if (req.file) {
    // Handle image upload
    const uploadResult = await uploadOnCloudinary(req.file.path);
    if (!uploadResult) {
      return res.status(500).json({
        message: "Failed to upload image to Cloudinary",
        success: false,
      });
    }
    postImageUrl = uploadResult.url;

    // Find the existing tweet to get the current image URL
    const existingVlog = await Vlog.findById(postId);
    if (existingVlog && existingVlog.postImage) {
      // Delete the old image from Cloudinary
      const urlParts = existingVlog.postImage.split("/");
      const filename = urlParts[urlParts.length - 1];
      const publicId = filename.split(".")[0]; // Extract public ID

      const deleteResult = await deleteFromCloudinary(publicId);
      if (!deleteResult.success) {
        return res.status(500).json({
          message: `Failed to delete old image from Cloudinary: ${deleteResult.error}`,
          success: false,
        });
      }
    }
  }

  // Update the tweet with new description and (optional) new image
  const updatedPost = await Vlog.findOneAndUpdate(
    { _id: postId },
    { description, postImage: postImageUrl || undefined },
    { new: true }
  );

  if (!updatedPost)
    return res
      .status(404)
      .json({ message: "Failded to update", success: false });

  // Return success response
  return res.status(200).json({
    message: "Post Updated Successfully",
    updatedPost,
    success: true,
  });
};

// get  my posts
export const getMyPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Vlog.find({ userId: id });
    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json({ posts, success: true });
  } catch (error) {
    console.error(`Error while getting posts: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Internal server error while getting posts" });
  }
};

// get all post

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Vlog.find();
    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json({ posts, success: true });
  } catch (error) {
    console.error(`Error while getting posts: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Internal server error while getting posts" });
  }
};


