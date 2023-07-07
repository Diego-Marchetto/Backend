import { Router } from 'express';
import product from '../app.js';
import { productModel } from '../dao/mongo/models/product.model.js';


const router = Router();

router.get('/',async (req,res)=>{
    try{
        let product = await productModel.find();
        res.json({ status: "success", payload: product });
    } catch (error){
        console.log("Cannot get products" + error);
    }
})

router.post('/',async (req,res)=>{
    const { product_name, product_desc, product_price, product_stock} = req.body
    if(!product_name || !product_desc || !product_price || !product_stock)
        return res.json ({status: "error", error: "Datos incompletos"})    
    try{
        const result = await productModel.create({
            product_name,
            product_desc,
            product_price,
            product_stock
        })
        return res.json({ status: "success", payload: result })
    } catch (error){
        console.log("Cannot create products" + error);
    }
})

router.put('/:pid',async (req,res)=>{
    let {pid} = req.params;
    const { product_name, product_desc, product_price, product_stock } = req.body;
    if(!product.name||!product.desc||!product.price||!product.stock)
        return res.send({status: "error", error:"Datos incompletos"})
    const newProduct = {
        product_name,
        product_desc,
        product_price,
        product_stock,
    };
    try{
        const result = await productModel.updateOne({_id:pid}, newProduct)
        return res.send({status: "success", payload:result});
    }catch (error) {
        console.log("Cannot update product", + error);
    }
});

router.delete('/:pid',async (req,res)=>{
    let {pid} = req.params;
    try{
        let result = await productModel.deleteOne({_id:pid})
        return res.send({status: "success", payload:result})
    }catch(error){
        console.log("Cannot delete product" + error);
    }

})

/*router.get('/',(req,res)=>{
    res.json(product.getProducts());
})

router.post("/", (req, res) => {
    const producto = req.body
    product.addProduct(0, producto.title, producto.description, producto.price, producto.thumbnail, producto.code, producto.stock)
    res.status(201).json(product.getProducts());
})

/*router.put('/:id', (req, res) => {
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

/*router.get('/:id',(req,res)=>{
    const { id } = req.params;
    const producto = product.getProductById(id)
    if (producto) res.json(producto);
    else res.send("Producto no encontrado");
})*/

export default router;

