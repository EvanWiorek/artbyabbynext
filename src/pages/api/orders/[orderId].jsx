import { connectMongoDB } from "@/src/libs/MongoConnect";
import Order from "@/src/models/order.model";

export default async function handler(req, res) {
  const { orderId } = req.query

  await connectMongoDB();
  Order.findOne({ _id: orderId })
  .then((oneOrder) => res.status(200).json(oneOrder))
  .catch((err) => res.status(400).json(err))
}