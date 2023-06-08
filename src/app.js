import express from "express";
import productos from "./routes/productos.router.js";
import rCart from "./routes/cart.router.js";
import ProductManager from "./productManager.js";
import cartManager from "./cartManager.js";

const cart = new cartManager();
const product = new ProductManager();

product.clearProducts();
product.addProduct(0, "Celular", "Iphone 14 PRO MAX 256GB", 1500, "Sin imagen", 5520, 5, "Tecnologia", true)
product.addProduct(0, "Celular", "Iphone 13 256GB", 750, "Sin imagen", 5521, 5, "Tecnologia", true)
product.addProduct(0, "Celular", "Iphone 12 256GB", 500, "Sin imagen", 5522, 5, "Tecnologia", true)
product.updateProduct(1, "title", "Phone") //modifico un producto

cart.clearCarts(); //comandos que use para testear, se puede hacer desde Postaman
cart.addCart(0, []); //comandos que use para testear, se puede hacer desde Postaman
cart.addCart(0, []); //comandos que use para testear, se puede hacer desde Postaman
cart.addCart(0, []); //comandos que use para testear, se puede hacer desde Postaman
cart.addProdCart(1, 1); //comandos que use para testear, se puede hacer desde Postaman
cart.addProdCart(1, 1); //comandos que use para testear, se puede hacer desde Postaman
cart.addProdCart(1, 1); //comandos que use para testear, se puede hacer desde Postaman

console.log(product.getProducts());

const app = express();
    app.get('/',(req, res)=>{
    res.send("Bienvenidos a DettoStore")
})

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/products', productos)
app.use('/api/cart', rCart)

app.listen(8080,()=>console.log("Servidor en puerto 8080"))

export default product;



