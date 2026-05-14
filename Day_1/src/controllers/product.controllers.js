import { populate } from 'dotenv';
import Product from '../models/product.model.js';

export const createProduct = async (req,res)=>{
    try {
        const {title,price,category,stock}= req.body;


        const newProduct = await Product.create({
            title,
            price,
            category,
            stock

        })

        res.status(201).json({
            message:"Product created successfully",
            data:newProduct
        })
        
        
    } catch (error) {
    res.status(500).json({message:"Server Error"})
    console.log(error);

        
    }
}


export const getAllProducts = async (req,res)=>{
    try {
        console.log(req.query.sort)
       const sort = req.query.sort || "-createdAt"; 
        
  

    
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1 )*limit;

        const products = await Product.find().sort(sort).limit(limit).skip(skip);
        res.status(200).json({
            message:"Products fetched successfully",
            data:products
        })


        
    } catch (error) {
        res.status(500).json({message:"Server Error"})
        console.log(error);
    }
}