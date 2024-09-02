import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {
  generateToken,
  removeTokenCookie,
  setTokenCookie,
} from "../utils/generateToken.js";

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
    if (!user)
      return res
        .status(401)
        .json({ message: "User not found", success: false });

    // checking password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password " });
    }
    const token = generateToken([user._id, user.fullName]);

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
