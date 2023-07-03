import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: [true, "Product name cannot be blank."],
    },
    images: {
      type: [String],
      required: [true, "Products must have at least two images."],
    },
    category: {
      type: String,
      required: [true, "Products need to belong to a category."]
    },
    countInStock: {
      type: Number,
      required: [true, "Products need a minimum in stock count."]
    },
    description: {
      type: String,
      required: [true, "Products need a description."]
    },
    priceOptions: [{
      optionName: String,
      optionType: String,
      images: [String],
      price: {
        type: Number,
        required: [true, "Product needs a minimal price."]
      },
      description: String,
    }],
    additionalOptions: [{
      optionName: String,
      optionType: String,
      images: [String],
      description: String,
    }],
    shippingCost: {
      type: Number,
      required: true
    }
  },
)

// function imagesArray(val) {
//   return val.length >= 2;
// }

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;