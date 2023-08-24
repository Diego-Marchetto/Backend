import {Router} from 'express';
import productManager from '../controllers/product.controller.js';
import cartManager from '../controllers/cart.controller.js';

const viewsR = Router();
const prodManager = new productManager();
const managerCart = new cartManager();

viewsR.get('/', (req, res) => {
    res.render('home', { style: "styles.css"});
});

viewsR.get('/carts', async (req, res) => {
    const { carts, hasNextPage, hasPrevPage, nextPage, prevPage } = await managerCart.getCarts(req, res, req.query);
    res.render('carts', { 
        style: "styles.css",
        carts, 
        hasNextPage, 
        hasPrevPage, 
        nextPage, 
        prevPage,
    });
});

viewsR.get('/products', async (req, res) => {
    let { first_name, last_name, role, cid } = req.session.user;
    const { products, hasNextPage, hasPrevPage, nextPage, prevPage, page} = await prodManager.getProducts(req, res, req.query);
    res.render('prods', { 
        style: "styles.css",
        first_name,
        last_name,
        role,
        cid,
        products,
        hasNextPage, 
        hasPrevPage, 
        nextPage, 
        prevPage,
        page,
    });
});

viewsR.get('/product/:id', async (req, res) => {
    let { cid } = req.session.user;
    const product = await prodManager.getOneProduct(req.params.id);
    res.render('product', { 
        style: "styles.css", 
        product,
        cid,
    });
});

viewsR.get('/addproducts', (req, res) => {
    res.render('addProduct');
});

viewsR.get('/cart', async (req, res) => {
    const cart = await managerCart.getOneCart(req.params.id);
    res.render('cart', { 
        style: "styles.css", 
        cart,
    });
});

export default viewsR;
