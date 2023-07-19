import { Router } from 'express';
import cartManager from '../dao/mongo/manager/cartManager.js';

const rCart = Router();
const managerCart = new cartManager();

rCart.get('/', async (req, res) => {
    try {
        const carts = await managerCart.getCarts()
        res.json({ status: 200, data: carts })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
rCart.get('/:id', async (req, res) => {
    try {
        const cart = await managerCart.getOneCart(req.params.id)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
rCart.post('/', async (req, res) => {
    try {
        const cart = await managerCart.createCart(req.body)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
rCart.post('/:id/product/:productId', async (req, res) => {
    let { cid } = req.session.user;
    try {
        const cart = await managerCart.addToCart(cid, req.params.productId)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
rCart.put('/:id', async (req, res) => {
    try {
        const cart = await managerCart.updateCart(req.params.id, req.body)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
rCart.delete('/:id', async (req, res) => {
    try {
        const cart = await managerCart.deleteCart(req.params.id)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})
rCart.delete('/:id/product/:productId', async (req, res) => {
    try {
        const cart = await managerCart.removeFromCart(req.params.id, req.params.productId)
        res.json({ status: 200, data: cart })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})


export default rCart;