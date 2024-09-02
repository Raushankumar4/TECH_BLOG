import mongoose, { Schema } from "mongoose";

const vlogSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postImage: {
      type: String,
      required: false,
    },
    comment: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const Vlog = mongoose.model("Vlog", vlogSchema);
