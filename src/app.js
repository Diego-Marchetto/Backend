import express from "express";
import router from "./routes/products.router.js";
import rCart from "./routes/cart.router.js";
import viewsR from "./routes/views.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js"
import {Server} from "socket.io";
import mongoose from "mongoose";

const app = express();

const connection = async () =>{
    await mongoose.connect("mongodb+srv://zhelmomash:malmomento@cluster0.ezydc8x.mongodb.net/");
    console.log("Conectado exitosamente a la base de datos.")
}

connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/', viewsR)
app.use('/product', viewsR)
app.use('/carts', viewsR)
app.use('/products/product/:id', viewsR)
app.use('/products', router)
app.use('/cart', rCart)

app.engine("handlebars", handlebars.engine({ defaultLayout: 'main', extname: '.handlebars' }))

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));

const httpServer = app.listen(8080,()=>console.log("Servidor en puerto 8080"))
const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) =>{
    console.log("Un cliente se ha conectado.")
});







