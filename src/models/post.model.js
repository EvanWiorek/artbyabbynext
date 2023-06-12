import mongoose from "mongoose";

const AbbyPostSchema = new mongoose.Schema(
  {
    postTitle: {
      type: String,
      required: [true, "Post needs a title."],
    },
    postContent: {
      type: String,
    },
    videoURL: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    isLesson: {
      type: Boolean,
      default: false,
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const AbbyPost =
  mongoose.models.AbbyPost || mongoose.model("AbbyPost", AbbyPostSchema);
export default AbbyPost;
