const Cart = require("../models/cartModel");
const Product = require("../models/productModel"); // Assuming you have a product model

// Add an item to the cart
exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    // Check if the cart already exists
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists, create a new cart
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Cart exists, check if the product is already in the cart
      const productIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex > -1) {
        // Product is already in the cart, update the quantity
        cart.items[productIndex].quantity += quantity;
      } else {
        // Product is not in the cart, add it
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();

    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "No cart found for this user.",
      });
    }

    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

// Get the user's cart
exports.getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name price image",
    });

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "No cart found for this user.",
      });
    }

    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

// Update the quantity of an item in the cart
exports.updateCartItemQuantity = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "No cart found for this user.",
      });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.items[productIndex].quantity = quantity;
      await cart.save();

      res.status(200).json({
        status: "success",
        data: cart,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Product not found in the cart.",
      });
    }
  } catch (err) {
    next(err);
  }
};
