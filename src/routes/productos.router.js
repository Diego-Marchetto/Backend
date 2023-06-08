import { Router } from 'express';
import product from '../app.js';

const router = Router();

router.get('/',(req,res)=>{
    res.json(product.getProducts());
})

router.post("/", (req, res) => {
    const producto = req.body
    product.addProduct(0, producto.title, producto.description, producto.price, producto.thumbnail, producto.code, producto.stock)
    res.status(201).json(product.getProducts());
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, price, stock } = req.body;
    if ((!title) || (!description) || (!price) || (!stock)){
        console.log("Faltan completar algunos datos del producto")
    }else{
    product.updateProduct(id, "title", title)
    product.updateProduct(id, "description", description)
    product.updateProduct(id, "price", price)
    product.updateProduct(id, "stock", stock)
    res.json(product.getProducts());
    }
})

router.delete('/:id',(req,res)=>{
    const { id } = req.params;
    product.deleteProduct(id)
    return res.sendStatus(204);
})

router.get('/:id',(req,res)=>{
    const { id } = req.params;
    const producto = product.getProductById(id)
    if (producto) res.json(producto);
    else res.send("Producto no encontrado");
})

export default router;
