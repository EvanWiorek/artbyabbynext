import { connectMongoDB } from "@/src/libs/MongoConnect";
import AbbyPost from "@/src/models/post.model";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only POST requests are allowed." });
    return;
  }
  const { postTitle, postContent, videoURL, imageURL, isLesson, isUpdate } = req.body;

  try {
    await connectMongoDB();
    AbbyPost.create({ postTitle, postContent, videoURL, imageURL, isLesson, isUpdate }).then((data) => {
      console.log('data from try catch in controller: ', data);
      res.status(201).send(data);
    })
  }
  catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "Something went wrong." })
  }
}