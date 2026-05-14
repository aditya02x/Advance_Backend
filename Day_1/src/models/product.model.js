import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        required:[true,"Title is required"],
        type:String,
        trim:true,
        unique:true,
    },
    price:{
        required:[true,"Price is required"],
        type:Number,
        min:[0,"Price cannot be negative"],
    },
    category:{
        required:[true,"Category is required"],
        type:String,
    },
    stock:{
        required:[true,"Stock is required"],
        type:Number,
        min:[0,"Stock cannot be negative"],
    }
})

export default mongoose.model("Product",productSchema)