const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Protect all routes below this middleware
router.use(authMiddleware.protect);

// Routes for users to manage their orders
router
  .route("/")
  .get(orderController.getMyOrders) // Get all orders of the logged-in user
  .post(orderController.createOrder); // Create a new order

router
  .route("/:id")
  .get(orderController.getOrder)
  .patch(authMiddleware.restrictTo("admin"), orderController.updateOrderStatus)
  .delete(authMiddleware.restrictTo("admin"), orderController.deleteOrder);

// Admin-only routes
router.use(authMiddleware.restrictTo("admin"));

router.route("/admin/all-orders").get(orderController.getAllOrders); // Get all orders (Admin only)

module.exports = router;
