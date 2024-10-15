const express = require("express");
const multer = require("multer");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
// All The Next Routes Are Protected
router.use(authMiddleware.protect);

// RESTRICTING ALL ROUTES AFTER THIS MIDDLEWARE TO ADMIN
router.use(authMiddleware.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
