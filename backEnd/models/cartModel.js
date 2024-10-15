const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Cart item must have a product ID"],
  },
  quantity: {
    type: Number,
    required: [true, "Cart item must have a quantity"],
    min: [1, "Quantity can not be less than 1."],
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Cart must belong to a user"],
    unique: true,
  },
  items: [cartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
