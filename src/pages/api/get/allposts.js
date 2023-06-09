import { connectMongoDB } from "@/src/libs/MongoConnect";
import AbbyPost from "@/src/models/post.model";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send({ msg: "Only GET requests are allowed." });
    return;
  }

  try {
    await connectMongoDB();
    const allPosts = await AbbyPost.find();
    res.status(200).send(allPosts);
  }
  catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "Something went wrong." })
  }
}