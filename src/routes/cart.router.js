import { Router } from 'express';
import cartManager from '../cartManager.js';
import productManager from "../productManager.js"
import { cartModel } from '../dao/mongo/models/cart.model.js';

const cartValue = new cartManager();
const producto = new productManager();

const rCart = Router();

rCart.get('/',(req,res)=>{
    res.json(cartValue.getCarts());
})

rCart.get('/:cid',(req,res)=>{
    const { cid } = req.params;
    const carts = cartValue.getCartById(cid)
    if (carts) res.json(carts);
    else res.send("Carrito no encontrado");
})

rCart.post('/:cid', async (req, res)=> {
    const { cid } = req.params;
    if(!cid)
    return res.json ({status: "error", error: "Ingresa el numero ID del carrito"})    
try{
    const result = await cartModel.create({
        cid
    })
    return res.json({ status: "success", payload: result })
} catch (error){
    console.log("Cannot create cart" + error);
}
})

rCart.post('/:cid/product/:pid', (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    const carts = cartValue.getCartById(cid);
    const prod = producto.getProductById(pid)
    if (carts){
        cartValue.addProdCart(cid, pid);
        res.send(cartValue.getCarts());
    }else{
        res.send("Carrito no encontrado");
    }

})

export default rCart;