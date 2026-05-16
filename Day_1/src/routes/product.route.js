import express from "express";
import { createProduct ,getAllProducts } from "../controllers/product.controllers.js";
import ratelimiter from "../middleware/ratelimiter.js";

const router = express.Router();


router.post("/add",createProduct)
router.get("/", ratelimiter, getAllProducts)

export default router;