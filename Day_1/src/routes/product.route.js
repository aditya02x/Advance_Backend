import express from "express";
import { craeteProduct ,getAllProducts } from "../controllers/product.controllers";

const router = express.Router();


router.post("/add",craeteProduct)
router.get("/getall",getAllProducts)

export default router;