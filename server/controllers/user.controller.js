import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {
  generateToken,
  removeTokenCookie,
  setTokenCookie,
} from "../utils/generateToken.js";
import mongoose from "mongoose";
import { Vlog } from "../models/vlog.model.js";

// register user
export const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (password.length <= 6) {
      return res.status(400).json({
        message: "Password must be longer than 6 characters",
        success: false,
      });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    let profileUrl = null;

    if (req.file) {
      console.log("File received for upload:", req.file);
      const profileImageLocalPath = req.file.path;

      try {
        const uploadProfile = await uploadOnCloudinary(profileImageLocalPath);

        if (uploadProfile && uploadProfile.url) {
          profileUrl = uploadProfile.url;
        } else {
          console.error(
            `Upload profile response is invalid: ${JSON.stringify(
              uploadProfile
            )}`
          );
          return res.status(500).json({ message: "Error uploading image" });
        }
      } catch (uploadError) {
        console.error(`Error uploading image: ${uploadError.message}`);
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    const registration = await User.create({
      fullName,
      username,
      email,
      password: hashPassword,
      profileImage: profileUrl,
    });

    if (registration) {
      return res.status(200).json({
        message: "User registered successfully",
        registration,
        success: true,
      });
    }

    return res
      .status(401)
      .json({ message: "Error While Registration", success: false });
  } catch (error) {
    console.error(`Error While registration: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// lggin user

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(401)
        .json({ message: "Please enter email or password" });
    // finding user has registered or not

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }

    // checking password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password " });
    }
    const token = generateToken(user._id);

    setTokenCookie(res, token);

    return res.status(200).json({
      message: `Welcome ${user.fullName}`,
      user,
      token,
      success: true,
    });
  } catch (error) {
    console.error(`Error While login: ${error.message}`);
    return res.status(500).json({ message: "Error While login" });
  }
};

// logout user

export const logOut = async (req, res) => {
  try {
    // remove tokenCookies
    removeTokenCookie(res);
    return res
      .status(200)
      .json({ message: "log out successfully", success: true });
  } catch (error) {
    console.error(`Error While LogOut: ${error.message}`);
    return res.status(500).json({ message: "Error While LogOut" });
  }
};

// get userProfile

export const userProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }
    return res
      .status(200)
      .json({ message: "User Profile", user, success: true });
  } catch (error) {
    console.error(`Error While gettingProfile: ${error.message}`);
    return res.status(500).json({ message: "Error While getting profile" });
  }
};

// update  userProfile

export const updateUserProofile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, username } = req.body;
    let profileImageLocalPath = req.file ? req.file.path : null;

    // finding user
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    // prepare for update the profile
    const updates = {};
    if (fullName) updates.fullName = fullName;
    if (username) updates.username = username;
    if (profileImageLocalPath) {
      const profileImage = await uploadOnCloudinary(profileImageLocalPath);
      updates.profileImage = profileImage.url;
    }

    // now update user profile
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res
        .status(403)
        .json({ message: "Failed to Update", success: false });
    }

    return res
      .status(200)
      .json({ message: "Updated Successfully", updatedUser, success: true });
  } catch (error) {
    console.error(`Error While updating: ${error.message}`);
    return res.status(500).json({ message: "Error While updating" });
  }
};

// change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.params;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "currentPassword & newPassword required ",
        success: false,
      });
    }
    if (newPassword.length <= 6) {
      return res.status(400).json({
        message: "New password must be longer than 6 characters",
        success: false,
      });
    }

    // finding logged in user
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    // Check if current password is correct.
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    // checking password is correct or not
    if (!isPasswordMatch) {
      return res
        .status(403)
        .json({ message: "Current password is in Incorrect", success: false });
    }
    // now hashing the password
    const hashPassword = await bcrypt.hash(newPassword, 16);
    // saving the new password
    user.password = hashPassword;
    await user.save();
    return res
      .status(200)
      .json({ message: "Password updated successfully", success: true });
  } catch (error) {
    console.error(`Error While updating password: ${error.message}`);
    return res.status(500).json({ message: "Error While updating password" });
  }
};

// saved another user vlog

export const savePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    // Validate input
    if (
      !userId ||
      !postId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(postId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid User ID or Post ID", success: false });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Check if the post exists
    const vlog = await Vlog.findById(postId);
    if (!vlog) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    // Check if the post is already saved
    if (user.savedPosts.some((post) => post._id.toString() === postId)) {
      return res
        .status(400)
        .json({ message: "Post already saved", success: false });
    }

    // Save the whole vlog document
    user.savedPosts.push(vlog);
    await user.save();

    return res
      .status(200)
      .json({ message: "Post saved successfully", success: true });
  } catch (error) {
    console.error(`Error while saving post: ${error.message}`);
    return res
      .status(500)
      .json({
        message: "Internal server error while saving post",
        success: false,
      });
  }
};
