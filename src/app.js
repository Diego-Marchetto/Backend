import express from "express";
import router from "./routes/products.router.js";
import rCart from "./routes/cart.router.js";
import viewsR from "./routes/views.router.js";
import registerRoutes from "./routes/register.router.js";
import loginRoutes from "./routes/login.router.js";
import logoutRoutes from "./routes/logout.routes.js";
import profileRoutes from "./routes/profile.router.js";
import handlebars from "express-handlebars";
import { authenticate, checkAdmin } from "./middlewares/authenticate.js";
import __dirname from "./utils.js"
import {Server} from "socket.io";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import cookiesRouter from "./routes/cookies.router.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import { iniPassport } from "./config/passport.config.js";
import { connectMongo } from "./utils/dBConnection.js";

const app = express();

app.use(session({
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://zhelmomash:malmomento@cluster0.ezydc8x.mongodb.net/",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 15 * 60,
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//motor plantillas
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));

const httpServer = app.listen(8080,()=>{
    console.log("Servidor en puerto 8080")
});
const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) =>{
    console.log("Un cliente se ha conectado.")
});

connectMongo();

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsR)
app.use('/product', viewsR)
app.use('/carts', viewsR)
app.use('/products/product/:id', viewsR)
app.use('/products', router)
app.use('/cart', rCart)
app.use("/cookie", cookiesRouter);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/logout", authenticate, logoutRoutes);
app.use("/profile", authenticate, profileRoutes);
app.use("/admin", checkAdmin, (req, res) => {
    res.render("admin");
  });

app.engine("handlebars", handlebars.engine({ defaultLayout: 'main', extname: '.handlebars' }))









