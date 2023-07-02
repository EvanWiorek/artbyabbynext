const { connectMongoDB } = require("@/src/libs/MongoConnect");
const { default: Order } = require("@/src/models/order.model");

const handler = async (req, res) => {

  await connectMongoDB();
  const order = await Order.findById(req.query.orderId);
  if (order) {
    order.paymentResult = {
      id: req.body.orderId,
      status: req.body.status,
      email_address: req.body.email_address
    }
    const paidOrder = await order.save();
    res.send({ message: 'Order paid successfully', order: paidOrder })
  } else {
    res.status(404).send({ message: 'Error: order not found' })
  }
}