import fs from "fs";

class cartManager {

    carts;

    constructor() {
        this.carts = [];
        this.file = 'productosCart.json'
        this.#cargarArchivo();
    }

    #cargarArchivo(){
        try{
            if(fs.existsSync(this.file)){
                const dataProducts = fs.readFileSync(this.file, 'utf-8');
                this.carts = JSON.parse(dataProducts);
            }else{
                const data = JSON.stringify(this.carts);
                fs.writeFileSync(this.file, data);
            }
        } catch (error){
            console.log("Hubo un error al intentar cargar el archivo.")
        }
    }

    getCarts() {
        return this.carts;
    }

    addCart(id, products) {

        const newCart = {
            id: this.carts.length + 1,
            products: products = [],
        }
        const existCart = this.getCartById(id);
        if (existCart){
            console.log("Este carrito ya existe, solo puede agregar nuevos productos")
            }else{
                this.carts.push(newCart)
                const data = JSON.stringify(this.carts)
                fs.writeFileSync(this.file, data)
            }
    }

    addProdCart(cId, pId, quantity){
        const thisCart = this.getCartById(cId)
        const arrayCart = thisCart.products;
        const existProductCart = arrayCart.find (prod => prod.id == pId)

        if (existProductCart){
            existProductCart.quantity += 1;
            const data = JSON.stringify(this.carts)
            fs.writeFileSync(this.file, data)
        }else{
            const newObject = {
                id: pId,
                quantity: quantity = 1,
            }
            arrayCart.push(newObject)
            const data = JSON.stringify(this.carts)
            fs.writeFileSync(this.file, data)
        }
    }

    getCartById(idCart) { //buscar carrito
        return this.carts.find(cart => cart.id == idCart);
    }

    clearCarts(){ //dejar el arreglo y el json vacio
        this.carts = [];
        const data = JSON.stringify(this.carts)
        fs.writeFileSync(this.file, data)
    }
}

export default cartManager;