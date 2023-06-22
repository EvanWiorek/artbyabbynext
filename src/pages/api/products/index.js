import { connectMongoDB } from "@/src/libs/MongoConnect";
import Product from "@/src/models/product.model";

export default async function handler(req, res) {
  await connectMongoDB();
  Product.find()
  .then((allProducts) => res.status(200).json(allProducts))
  .catch((err) => res.status(400).json(err))
}