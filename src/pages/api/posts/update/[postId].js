import { connectMongoDB } from "@/src/libs/MongoConnect";
import AbbyPost from "@/src/models/post.model";

export default async function handler(req, res) {
  const { postId } = req.query

  await connectMongoDB();
  AbbyPost.findOneAndUpdate({ _id: postId}, req.body)
  .then((updatedPost) => res.status(200).json(updatedPost))
  .catch((err) => res.status(400).json(err))
}