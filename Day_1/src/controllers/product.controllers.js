import product from '../models/product.model.js';

export const craeteProduct = async (req,res)=>{
    try {
        const {title,price,category,stock}= req.body;


        const newProduct = await product.create({
            title,
            price,
            category,
            stock

        })

        res.status(201).json({
            message:"Product created successfully",
            data:newProduct
        })
        await newProduct.save();
        
    } catch (error) {
    res.status(500).json({message:"Server Error"})
    console.log(error);

        
    }
}