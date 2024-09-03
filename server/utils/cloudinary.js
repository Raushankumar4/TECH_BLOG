import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilePath) => {
  if (!localfilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });

    // Delete the local file after successful upload
    try {
      fs.unlinkSync(localfilePath);
    } catch (unlinkError) {
      console.error("Error deleting local file after upload:", unlinkError);
    }

    return response; // Ensure this has a `url` property
  } catch (error) {
    // Ensure local file is deleted even if there's an error
    try {
      fs.unlinkSync(localfilePath);
    } catch (unlinkError) {
      console.error(
        "Error deleting local file after upload failure:",
        unlinkError
      );
    }
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      return { success: false, error: "Public ID is required" };
    }

    console.log(`Attempting to delete image with Public ID: ${publicId}`);

    // Try specifying 'image' explicitly
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    console.log("Cloudinary delete result:", result);

    if (result.result === "ok") {
      return { success: true };
    } else {
      return {
        success: false,
        error: `Cloudinary response result: ${result.result}`,
      };
    }
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return { success: false, error: error.message };
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
