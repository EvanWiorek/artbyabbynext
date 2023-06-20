import { connectMongoDB } from "@/src/libs/MongoConnect";
import Product from "@/src/models/product.model";

export default async function handler(req, res) {
  const { productId } = req.query

  await connectMongoDB();
  Product.findOneAndUpdate({ _id: productId}, req.body)
  .then((updatedPost) => res.status(200).json(updatedPost))
  .catch((err) => res.status(400).json(err))
}