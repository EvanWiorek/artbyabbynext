import { connectMongoDB } from "@/src/libs/MongoConnect";
import Order from "@/src/models/order.model";


export default async function handler(req, res) {
  const { orderItems, customerInfo, paymentMethod, cartTotal } = req.body

  try {
    await connectMongoDB();
    Order.create({
      orderItems,
      customerInfo,
      paymentMethod,
      cartTotal
    })
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
  }
  catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "Something went wrong." })
  }
}