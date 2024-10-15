const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Order must belong to a user"],
  },
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Order must contain a product"],
      },
      quantity: {
        type: Number,
        required: [true, "Please specify the quantity for the product"],
        min: [1, "Quantity must be at least 1"],
      },
      price: {
        type: Number,
        required: [true, "Product price must be included in the order"],
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
    min: [0, "Total price must be a positive number"],
  },
  shippingAddress: {
    address: {
      type: String,
      required: [true, "Please provide a shipping address"],
    },
    city: { type: String, required: [true, "Please provide a city"] },
    postalCode: {
      type: String,
      required: [true, "Please provide a postal code"],
    },
    country: { type: String, required: [true, "Please provide a country"] },
  },
  paymentMethod: {
    type: String,
    required: [true, "Please provide a payment method"],
    enum: ["Credit Card", "PayPal", "Cash on Delivery"],
  },
  paymentStatus: {
    type: String,
    required: [true, "Payment status is required"],
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  orderStatus: {
    type: String,
    required: [true, "Order status is required"],
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: Date,
});

orderSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "products.product",
    select: "name price",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
