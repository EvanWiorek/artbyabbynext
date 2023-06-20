import { connectMongoDB } from "@/src/libs/MongoConnect";
import Product from "@/src/models/product.model";

export default async function handler(req, res) {
  const { productId } = req.query

  await connectMongoDB();
  Product.deleteOne({ _id: productId })
  .then((deleteConfirm) => res.status(200).json(deleteConfirm))
  .catch((err) => res.status(400).json(err))
}