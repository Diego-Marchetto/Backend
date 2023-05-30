const fs = require('fs')
const http = require ('http');
const express = require ('express');

class ProductManager {

    products;
    #file;

    constructor() {
        this.products = [];
        this.#file = 'productos.json'
        this.#cargarArchivo();
    }

    #cargarArchivo(){
        try{
            if(fs.existsSync(this.#file)){
                const dataProducts = fs.readFileSync(this.#file, 'utf-8');
                this.products = JSON.parse(dataProducts);
            }else{
                const data = JSON.stringify(this.products);
                fs.writeFileSync(this.#file, data);
            }
        } catch (error){
            console.log("Hubo un error al intentar cargar el archivo.")
        }
    }

    getProducts() {
        return this.products;
    }

    addProduct(id, title, description, price, thumbnail, code, stock) {

        const product = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        const existProductId = this.getProductById(id);
        const existProductCode = this.getProductById(code);
        if (existProductId || existProductCode) {
            console.log("El producto ya existe")
        }else{
            if ((!title) || (!description) || (!thumbnail) || (!code) || (!stock)){
                console.log("Faltan completar algunos datos del producto")
            }else{
                this.products.push(product)
                const data = JSON.stringify(this.products)
                fs.writeFileSync(this.#file, data)
            }
            }
        }

    getProductById(idProduct) { //buscar producto
        return this.products.find(product => product.id == idProduct);
    }

    clearProducts(){ //dejar el arreglo y el json vacio
        this.products = [];
        const data = JSON.stringify(this.products)
        fs.writeFileSync(this.#file, data)
    }

    updateProduct(idProduct, value, newDate){

        const item = this.getProductById(idProduct) //busco el id en el arreglo
        
        if(item === undefined){
            console.log("El producto no existe.")
        }else{
            if (value == "title"){
                item.title = newDate
            }
    
            if (value == "description"){
                item.description = newDate
            }
    
            if (value == "price"){
                item.price = newDate
            }
    
            const data = JSON.stringify(this.products)
            fs.writeFileSync(this.#file, data)
        }
    }

    deleteProduct(idProduct){
        const item = this.getProductById(idProduct) //busco el id en el arreglo
        const indice = this.products.indexOf(item) //guardo el indice de ese producto

        if(item === undefined){ //si el producto no existe
            console.log("El producto no existe")
        }else{ //si existe lo borro
            this.products.splice(indice, 1) //saco ese producto del arreglo
            const data = JSON.stringify(this.products) //vuelvo a escribir el JSON con los datos actualizados
            fs.writeFileSync(this.#file, data)
            console.log("Producto borrado satisfactoriamente")
        }
    }

}

const product = new ProductManager();

product.clearProducts();

product.addProduct(0, "Celular", "Iphone 14 PRO MAX 256GB", 1500, "Sin imagen", 5520, 5)
product.addProduct(0, "Celular", "Iphone 13 256GB", 750, "Sin imagen", 5521, 5)
product.addProduct(0, "Celular", "Iphone 12 256GB", 500, "Sin imagen", 5522, 5)

product.deleteProduct(2)
product.updateProduct(1, "title", "Phone")

console.log(product.getProducts());

const app = express();
    app.get('/home',(req,res)=>{
    res.send("Bienvenidos a DettoStore")
})

app.get('/products',(req,res)=>{
    res.json(product.getProducts());
})

app.get('/products/:id',(req,res)=>{
    const { id } = req.params;
    const producto = product.getProductById(id)
    if (producto) res.json(producto);
    else res.send("Producto no encontrado");
})

app.listen(8080,()=>console.log("Servidor en puerto 8080"))