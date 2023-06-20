import { connectMongoDB } from "@/src/libs/MongoConnect";
import Product from "@/src/models/product.model";

export default async function handler(req, res) {
  const { productId } = req.query

  await connectMongoDB();
  Product.findOne({ _id: productId })
  .then((oneProduct) => res.status(200).json(oneProduct))
  .catch((err) => res.status(400).json(err))
}