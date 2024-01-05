import mongoose from "mongoose"

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
    content: {
      type: String,
      required: true,
      trim: true,
    },
    languaje: {
      type: String,
      required: true,
      trim: true,
    },
    code_base: {
      type: String,
      required: true,
      trim: true,
    },
    expected_result: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model("Post", postSchema)
