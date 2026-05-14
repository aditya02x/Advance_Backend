import express from "express";
import { craeteProduct } from "../controllers/product.controllers";

const router = express.Router();


router.post("/add",craeteProduct)

export default router;