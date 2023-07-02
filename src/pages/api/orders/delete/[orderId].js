import { connectMongoDB } from "@/src/libs/MongoConnect";
import Order from "@/src/models/order.model";

export default async function handler(req, res) {
  const { orderId } = req.query

  await connectMongoDB();
  Order.deleteOne({ _id: orderId })
  .then((deleteConfirm) => res.status(200).json(deleteConfirm))
  .catch((err) => res.status(400).json(err))
}