import express from "express";
import dotenv from "dotenv";
import productRoute from "./routes/product.route.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/products", productRoute);

export default app;