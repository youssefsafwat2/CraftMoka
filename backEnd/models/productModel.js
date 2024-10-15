const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
    trim: true,
  },
  slug: String,

  stock: {
    type: Number,
    required: [true, "Please provide the quantity"],
    min: [0, "Stock must be 0 or greater"],
  },

  price: {
    type: Number,
    required: [true, "A product must have a price"],
    min: [0, "Price must be 0 or greater"],
  },
  priceDiscount: {
    type: Number,
  },

  image: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// Indexing
productSchema.index({ slug: 1 });
productSchema.index({ price: 1 });

// Slug generation middleware
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });

  if (this.priceDiscount >= this.price) {
    return next(new Error("Discount price should be below regular price"));
  }
  next();
});
productSchema.pre(/^findOneAndUpdate/, async function (next) {
  // Get the update fields
  const update = this.getUpdate();

  // If priceDiscount or price is being updated
  if (update.priceDiscount || update.price) {
    // Get the current document being updated
    const product = await this.model.findOne(this.getQuery());

    // If product exists and priceDiscount is greater than or equal to price
    const price = update.price || product.price;
    if (update.priceDiscount && update.priceDiscount >= price) {
      return next(new Error("Discount price should be below regular price"));
    }
  }

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
