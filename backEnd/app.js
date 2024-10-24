// const path = require("path");
const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const AppError = require("./utils/appError");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const cartRouter = require("./routes/cartRoutes");

const app = express();
// Important for deployment
app.enable("trust proxy");
app.set("trust proxy", false);
// Security HTTP Headers
app.use(helmet());

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 200,
  WindowMs: 60 * 60, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});

// app.use("/api", limiter);
app.use(express.json({ limit: "100kb" }));

app.use(cookieParser());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

app.use(
  hpp({
    whitelist: ["price", "category"],
  })
);

app.use(compression());
app.use(cors());
app.use(
  cors({
    origin: "https://craft-moka-4wzy.vercel.app",
  })
);
// Routes

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/cart", cartRouter);
app.all("*", (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
