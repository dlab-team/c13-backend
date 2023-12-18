import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      require: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Post", postSchema);
