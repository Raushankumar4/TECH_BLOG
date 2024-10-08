import mongoose, { Schema } from "mongoose";

const vlogSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    title: {
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
    categories: {
      type: Array,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export const Vlog = mongoose.model("Vlog", vlogSchema);
