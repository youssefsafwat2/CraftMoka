const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Adjust the path to your User model
const AppError = require("../utils/appError"); // Custom error handler
const catchAsync = require("../utils/catchAsync"); // Utility function to handle async functions

// Protecting routes: Only logged-in users can access
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) Get the token from headers or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Get the token from the Authorization header
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt; // Fallback to cookies
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401)
    );
  }

  // 4) Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // Access granted, user is authenticated
  req.user = currentUser;
  next();
});

// Restricting access to specific roles (e.g., 'admin', 'lead-guide')
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array of allowed roles ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
