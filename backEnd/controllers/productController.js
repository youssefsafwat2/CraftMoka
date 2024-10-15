const multer = require("multer");
const sharp = require("sharp");
const Product = require("./../models/productModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

// Set up memory storage
const multerStorage = multer.memoryStorage();

// Filter files to allow only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

// Multer upload middleware
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Use the multer upload middleware in routes directly
exports.uploadProductImages = upload.fields([{ name: "images", maxCount: 3 }]);

// Resize images middleware
exports.resizeProductImages = catchAsync(async (req, res, next) => {
  // Check if files are present and handle empty or missing images
  if (!req.files || !req.files.images || req.files.images.length === 0) {
    return next(); // Proceed to the next middleware if no images are uploaded
  }

  // Prepare array for storing the filenames
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      try {
        // Resize and save image to public directory
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/img/products/${filename}`);

        // Add filename to req.body.images
        req.body.images.push(filename);
      } catch (error) {
        console.error("Error processing image:", error);
        return next(
          new AppError("Error processing image. Please try again.", 500)
        );
      }
    })
  );

  next();
});

// Product controller handlers
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

// Top products route handler
exports.topProducts = (req, res, next) => {
  req.query.limit = "4";
  req.query.sort = "price";
  req.query.fields = "name,price";
  next();
};
