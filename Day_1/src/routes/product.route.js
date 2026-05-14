import express from "express";
import { createProduct ,getAllProducts } from "../controllers/product.controllers.js";

const router = express.Router();


router.post("/add",createProduct)
router.get("/",getAllProducts)

export default router;