import mongoose from "mongoose";

const AbbyPostSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: [true, "Post needs a title."]
  },
  postContent: {
    type: String,
  },
  videoURL: {
    type: String
  },
  isLesson: {
    type: Boolean,
    default: false
  },
  isUpdate: {
    type: Boolean,
    default: false
  }
})

const AbbyPost = mongoose.models.AbbyPost || mongoose.model("AbbyPost", AbbyPostSchema);
export default AbbyPost;