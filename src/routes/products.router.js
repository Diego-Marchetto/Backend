import { Router } from 'express';
import productManager from '../dao/mongo/manager/productManager.js';

const router = Router();
const prodManager = new productManager();

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prodManager.getOneProduct(id)
        res.json({ status: 200, data: product })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})

router.post("/", async (req, res) => {
    const { name, description, code, thumbnail, price, stock } = req.body;
    if (!name || !description || !code || !thumbnail || !price || !stock) {
        return res.json({ status: 400, err: "Faltan datos" })
    }
    const product = req.body;
    await manager.createProduct(product)
    res.json({ status: 200, data: product })
})

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, code, thumbnail, price, stock } = req.body;
    const product = req.body;
    await prodManager.updateProduct(id, product)
    res.json({ status: 200, data: product })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prodManager.deleteProduct(id)
    res.send(204)
})

export default router;

