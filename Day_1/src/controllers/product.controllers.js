import Product from '../models/product.model.js';
import asynchandeler from '../middleware/asynchandler.js';
import redisClient from '../config/redis.js';
import productQueue from '../queues/product.queue.js';

export const createProduct = asynchandeler(
    async (req, res) => {
        const { title, price, category, stock } = req.body;

       
       

        const newProduct = await Product.create({
            title,
            price,
            category,
            stock
        });
         const keys = await redisClient.keys("products*");
         if(keys.length > 0) {
            await redisClient.del(keys);
         }

        res.status(201).json({
            message: "Product created successfully",
            data: newProduct
        });

        await productQueue.add("newProduct", {
            productId: newProduct._id,
            title: newProduct.title
        });
    }
);

export const getAllProducts = asynchandeler(
    async (req, res) => {
        console.log(req.query);

        const sort = req.query.sort || "-createdAt";
        const category = req.query.category;
        const search = req.query.search;

        const query = {};

        if (category) {
            query.category = category;
        }
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const limit = parseInt(req.query.limit) || 10;
        if (limit > 50 || limit < 1) {
            return res.status(400).json({ message: "Limit cannot be greater than 50 or less than 1" });
        }

        const page = parseInt(req.query.page) || 1;
        if (page < 1 || isNaN(page)) {
            return res.status(400).json({ message: "Page cannot be less than 1" });
        }

        const skip = (page - 1) * limit;
        if (skip < 0 || isNaN(skip)) {
            return res.status(400).json({ message: "Skip cannot be less than 0" });
        }

        const cachedKey = req.originalUrl;

        const cachedProduct = await redisClient.get(cachedKey);

        if (cachedProduct) {
            console.log("Products fetched from Redis");
            return res.status(200).json({
                message: "Products fetched successfully (from cache)",
                data: JSON.parse(cachedProduct)
            });
        }

        const products = await Product.find(query)
            .sort(sort)
            .limit(limit)
            .skip(skip);

        // Cache the products in Redis for 10 seconds
        await redisClient.set("products", JSON.stringify(products), {
            EX: 10
        });

        res.status(200).json({
            message: "Products fetched successfully",
            data: products
        });
    }
);

export const updateProduct = asynchandeler(async (req, res) => {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedProduct) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
    });
});

export const deleteProduct = asynchandeler(async (req, res) => {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: deletedProduct,
    });
});