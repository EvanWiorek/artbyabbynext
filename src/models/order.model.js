import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerInfo: {
      address: String,
      city: String,
      country: String,
      email: String,
      fullName: String,
      phoneNumber: String,
      postalCode: String,
      userState: String,
    },
    orderItems: [
      {
        productName: String,
        quantity: Number,
        productImage: String,
        originalId: String,
        tempId: String,
        productPrice: Number,
        additionalOption: {
          optionName: String,
          optionType: String,
          images: [String],
          description: String,
        },
        productPriceOption: {
          optionName: String,
          optionType: String,
          images: [String],
          price: Number,
          description: String,
        }
      }
    ],
    paymentMethod: String,
    cartTotal: Number,
    isShipped: {
      type: Boolean,
      default: false
    },
    trackingNumber: String,
    completionDate: Date,
  },
  { timestamps: true }
)

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;