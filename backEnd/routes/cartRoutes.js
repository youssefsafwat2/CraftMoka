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
  .patch(cartController.updateCartItemQuantity)
  .delete(cartController.clearCart);

router.route("/remove").post(cartController.removeFromCart);

module.exports = router;
