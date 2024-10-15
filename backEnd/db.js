const mongoose = require("mongoose");
const dotenv = require("dotenv");
const catchAsync = require("./utils/catchAsync");

// Load environment variables from .env file
dotenv.config();

const connectDB = catchAsync(async () => {
  // Accessing the environment variables correctly
  const mongoURI = process.env.MONGODB_URI.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
  );
  // Connect to MongoDB
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB connected successfully");
});

// Export the connectDB function
module.exports = connectDB;
