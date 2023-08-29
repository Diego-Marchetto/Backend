import importModels from "../dao/factory.js";
//import { cartsModel } from "../DAO/models/carts.model.js";

const models = await importModels();
const cartsModel = models.carts;

class cartsServices {
  async getAll() {
    const carts = await cartsModel.getAll();
    return carts;
  }

  async createCart() {
    const cartCreated = await cartsModel.createCart();
    return cartCreated;
  }

  async getLimit(limit) {
    const carts = await cartsModel.getLimit(limit);
    return carts;
  }

  async addProductToCart(cid, pid, quantityParams) {
    try {
      const updatedCart = await cartsModel.addProductToCart(
        cid,
        pid,
        quantityParams
      );
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cid) {
    const cart = await cartsModel.getCartById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  }

  async deleteProductInCart(cid, pid) {
    try {
      const updatedCart = cartsModel.deleteProductInCart(cid, pid);
      return updatedCart;
    } catch (error) {
      throw new error();
    }
  }

  async deleteCart({ cid }) {
    try {
      const updatedCart = cartsModel.deleteCart(cid);
      return updatedCart;
    } catch (error) {
      console.error("Error deleting product from cart:", error);
      throw error;
    }
  }
  async purchase(cid) {
    let userCart = await cartsModel.purchase(cid);

    return userCart;
  }
}
export const CServices = new cartsServices();
