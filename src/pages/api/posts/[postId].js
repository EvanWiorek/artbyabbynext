import { connectMongoDB } from "@/src/libs/MongoConnect";
import AbbyPost from "@/src/models/post.model";

export default async function handler(req, res) {
  const { postId } = req.query

  await connectMongoDB();
  AbbyPost.findOne({ _id: postId })
  .then((onePost) => res.status(200).json(onePost))
  .catch((err) => res.status(400).json(err))
}