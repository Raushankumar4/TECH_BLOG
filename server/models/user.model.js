import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: "String",
      required: true,
    },
    username: {
      type: "String",
      required: true,
      trim: true,
    },
    email: {
      type: "String",
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
      trim: true,
    },
    profileImage: {
      type: "String",
      required: false,
    },
    savedPost: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
