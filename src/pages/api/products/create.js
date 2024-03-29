import { connectMongoDB } from "@/src/libs/MongoConnect";
import Product from "@/src/models/product.model";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only POST requests are allowed." });
    return;
  }
  const { name, images, slug, category, description, countInStock, shippingCost, priceOptions, additionalOptions } = req.body;

  try {
    await connectMongoDB();
    Product.create({ name, images, slug, category, shippingCost, countInStock, description, priceOptions, additionalOptions  }).then((data) => {
      console.log('data from try catch in controller: ', data);
      res.status(201).send(data);
    })
  }
  catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "Something went wrong." })
  }
}