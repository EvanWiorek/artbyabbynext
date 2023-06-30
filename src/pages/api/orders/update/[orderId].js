import { connectMongoDB } from "@/src/libs/MongoConnect";
import Order from "@/src/models/order.model";

export default async function handler(req, res) {
  const { orderId } = req.query

  await connectMongoDB();
  Order.findOneAndUpdate({ _id: orderId}, req.body)
  .then((updatedProduct) => res.status(200).json(updatedProduct))
  .catch((err) => res.status(400).json(err))
}