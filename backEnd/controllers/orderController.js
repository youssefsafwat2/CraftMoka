const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Helper function to calculate total price of the order
const calculateTotalPrice = (products) => {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

// 1. Create a new order
exports.createOrder = catchAsync(async (req, res, next) => {
  const { products, shippingAddress, paymentMethod } = req.body;

  if (!products || products.length === 0) {
    return next(new AppError("Order must contain at least one product", 400));
  }

  const totalPrice = calculateTotalPrice(products);

  const order = await Order.create({
    user: req.user._id,
    products,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

// 2. Get all orders for the logged-in user
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders || orders.length === 0) {
    return next(new AppError("No orders found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      orders,
    },
  });
});

// 3. Get a specific order by ID (User or Admin)
exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  // Check if the user is the owner or if the request comes from an admin
  if (
    req.user.role !== "admin" &&
    order.user._id.toString() !== req.user._id.toString()
  ) {
    return next(
      new AppError("You do not have permission to view this order", 403)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

// 4. Admin: Get all orders (Admin only)
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    status: "success",
    data: {
      orders,
    },
  });
});

// 5. Admin: Update order status (Admin only)
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: req.body.orderStatus },
    { new: true, runValidators: true }
  );

  if (!updatedOrder) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      order: updatedOrder,
    },
  });
});

// 6. Admin: Delete an order (Admin only)
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
