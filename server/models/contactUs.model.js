import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      min: [10, "Phone number should be 10 digits"],
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Contact = mongoose.model("Contact", contactSchema);
