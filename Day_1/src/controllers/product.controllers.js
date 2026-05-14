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
        const products = await Product.find();
        res.status(200).json({
            message:"Products fetched successfully",
            data:products
        })


        
    } catch (error) {
        res.status(500).json({message:"Server Error"})
        console.log(error);
    }
}