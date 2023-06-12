import { connectMongoDB } from "@/src/libs/MongoConnect";
import AbbyPost from "@/src/models/post.model";

export default async function handler(req, res) {
  const { postId } = req.query

  await connectMongoDB();
  AbbyPost.deleteOne({ _id: postId })
  .then((deleteConfirm) => res.status(200).json(deleteConfirm))
  .catch((err) => res.status(400).json(err))
}