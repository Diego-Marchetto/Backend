import express from "express";
import productos from "./routes/productos.router.js";
import rCart from "./routes/cart.router.js";
import viewsR from "./routes/views.router.js";
import ProductManager from "./productManager.js";
import cartManager from "./cartManager.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js"
import {Server} from "socket.io";

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

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/', viewsR)
app.use('/api/products', productos)
app.use('/api/cart', rCart)
app.engine('handlebars',  handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));

const httpServer = app.listen(8080,()=>console.log("Servidor en puerto 8080"))
const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) =>{
    console.log("Un cliente se ha conectado.")
});


export default product;



