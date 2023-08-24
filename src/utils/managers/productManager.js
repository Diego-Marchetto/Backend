import fs from "fs";

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

    addProduct(id, title, description, price, thumbnail, code, stock, category, status=true) {

        const product = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status,
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

            if (value == "stock"){
                item.stock = newDate
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

export default ProductManager;