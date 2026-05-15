import express from "express";
import dotenv from "dotenv";
import productRoute from "./routes/product.route.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/products", productRoute);
app.use(errorMiddleware);
export default app;