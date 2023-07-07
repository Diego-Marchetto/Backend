import mongoose from 'mongoose';

const productCollection  = "products";

const productSchema = new mongoose.Schema({
    product_name:String,
    product_desc:String,
    product_price:Number,
    product_stock:Number,
})


export const productModel = mongoose.model(productCollection,productSchema);