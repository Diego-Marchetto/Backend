import { cartMongoose } from "./mongoose/carts.mongoose.js";
import { productModel } from "./products.model.js";

class CartModel {
  async getAll() {
    try {
      const carts = await cartMongoose.find(
        {},
        {
          __v: false,
        }
      );
      return carts;
    } catch (e) {
      throw e;
    }
  }
  async getLimit(limit) {
    const carts = await cartMongoose
      .find(
        {},
        {
          __v: false,
        }
      )
      .limit(limit);
    return carts;
  }
  async createCart() {
    const cartCreated = await cartMongoose.create({});
    return cartCreated;
  }
  async getCartById(cid) {
    const cart = await cartMongoose.findById(cid).populate("products.product");
    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  }
  async addProductToCart(cid, pid, quantityParams) {
    try {
      const cart = await cartsModel.getCartById(cid);
      const product = await productModel.getProductById(pid);

      if (!cart) {
        throw new Error("Cart not found");
      }
      if (!product) {
        throw new Error("Product not found");
      }
      const findProdInCart = await cartMongoose.findOne({
        products: { $elemMatch: { product: pid } },
      });

      if (findProdInCart) {
        await cartMongoose.updateOne(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.quantity": quantityParams } }
        );
      } else {
        cart.products.push({ product: product._id, quantity: quantityParams });
      }
      await cart.save();
      const updatedCart = await cartMongoose.findById(cid);

      return updatedCart;
    } catch (error) {
      throw error;
    }
  }
  async deleteProductInCart(cid, pid) {
    try {
      const cart = await cartMongoose.findById(cid);
      const product = await ProductModel.findById(pid);
      if (!cart) {
        throw new Error("Cart not found");
      }
      if (!product) {
        throw new Error("Product not found");
      }

      const findProdInCart = await cartMongoose.findOne({
        products: { $elemMatch: { product: pid } },
      });

      if (findProdInCart) {
        await cartMongoose.updateOne(
          { _id: cid, "products.product": pid },
          {
            $inc: { "products.$.quantity": -1 },
          }
        );
      }

      await cart.save();
      const updatedCart = await cartMongoose.findById(cid);

      return updatedCart;
    } catch (error) {
      throw error;
    }
  }
  async cartOutStock(cid, cart) {
    try {
      const updatedCart = await cartMongoose.findOneAndUpdate(
        { _id: cid },
        { products: cart },
        { new: true }
      );
      return updatedCart;
    } catch (error) {
      throw new error();
    }
  }
  async deleteCart(cid) {
    try {
      const updatedCart = await cartMongoose.findOneAndUpdate(
        { _id: cid },
        { products: [] },
        { new: true }
      );
      return updatedCart;
    } catch (error) {
      throw new error();
    }
  }
  async purchase(cid) {
    const userCart = await CartModel.findById(cid);
    return userCart;
  }
}
export const cartsModel = new CartModel();
