const express = require("express");
const productController = require("./../controllers/productController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo("admin"),
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo("admin"),
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.updateProduct
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo("admin"),
    productController.deleteProduct
  );

module.exports = router;
