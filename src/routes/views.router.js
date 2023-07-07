import express from "express";
import ProductManager from "../productManager.js";

const viewsR = express.Router();

const product = new ProductManager();
const arrayProducts = product.getProducts();


viewsR.get('/',(req, res)=>{
    res.render('index', {
        style: "styles.css",
        arrayProducts,
    });
})

viewsR.get('/chat',(req, res)=>{
    res.render('chat', {
        style: "styles.css",
    });
})

export default viewsR;
