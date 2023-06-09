import { connectMongoDB } from "@/src/libs/MongoConnect";
import AbbyPost from "@/src/models/post.model";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send({ msg: "Only GET requests are allowed." });
    return;
  }
  console.log(req.params.id);

  try {
    await connectMongoDB();
    // const onePost = await AbbyPost.findOne({ _id: req.routeId });
    // res.status(200).send(onePost);
  }
  catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "Something went wrong." })
  }
}