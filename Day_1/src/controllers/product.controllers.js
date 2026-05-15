import { populate } from 'dotenv';
import Product from '../models/product.model.js';
import asynchandeler from '../middleware/asynchandler.js';

export const createProduct = asynchandeler(
    async (req,res)=>{

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
        
        
    } 
) 



export const getAllProducts = asynchandeler(
    async (req,res)=>{
       
            console.log(req.query)
           const sort = req.query.sort || "-createdAt"; 
           const category = req.query.category;
           const search = req.query.search;

       const query = {}

         if(category){
            query.category = category;
         }
            if(search){
                query.title = {$regex:search,$options:"i"}
            }

        const limit = parseInt(req.query.limit) || 10;
        if(limit>50 || limit<1){
            return res.status(400).json({message:"Limit cannot be greater than 50 or less than 1"})
        }
        const page = parseInt(req.query.page) || 1;
        if(page<1 || isNaN(page)){
            return res.status(400).json({message:"Page cannot be less than 1"})
        }
        const skip = (page - 1 )*limit;
        if(skip<0 || isNaN(skip)){
            return res.status(400).json({message:"Skip cannot be less than 0"})
        }

        const products = await Product.find(query)
        .sort(sort)
        .limit(limit)
        .skip(skip)
        
        res.status(200).json({
            message:"Products fetched successfully",
            data:products
        })


        
  
})

const updateProduct = asynchandeler(
    async (req,res)=>{
        const {id} = req.params;
        const {title,price,category,stock} = req.body;

        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        const updateProduct = await Product.findByIdAndUpdate(id,{
            title,
            price,
            category,
            stock
        },{new:true})
        res.status(200).json({
            message:"Product updated successfully",
            data:updateProduct
        })
    }
)