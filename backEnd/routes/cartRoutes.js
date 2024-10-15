const express = require("express");
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Protect all routes after this middleware
router.use(authMiddleware.protect);

// Routes for Cart
router
  .route("/")
  .get(cartController.getCart)
  .post(cartController.addToCart)
  .patch(cartController.updateCartItemQuantity);

router.route("/remove").post(cartController.removeFromCart); // Remove an item from the cart

module.exports = router;
