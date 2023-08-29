import { checkUserCart } from "../middlewares/authenticate.js";
import { CServices } from "../services/carts.service.js";
import { PServices } from "../services/products.service.js";

class CartsController {
  getAll = async (req, res) => {
    try {
      const limit = req.query;
      console.log(limit);
      if (!!limit) {
        const carts = await CServices.getLimit(limit);
        return res.status(200).json({
          status: "success",
          msg: "listado de Carritos",
          payload: carts,
        });
      } else {
        const carts = await CServices.getAll();
        console.log(carts);
        return res.status(200).json({
          status: "success",
          msg: "listado de Carritos",
          payload: carts,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
  getCartById = (req, res) => {
    try {
      const { id } = req.params;
      const cartFound = CServices.getCartById(id);

      if (cartFound) {
        return res.status.json({
          status: "success",
          msg: "cart found",
          payload: cartFound,
        });
      } else {
        return res.status.json({
          status: "error",
          msg: "The indicated cart was not found",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status.json({ status: "error", msg: "Internal Server Error" });
    }
  };
  createCart() {
    try {
      const cartCreated = CServices.createCart();
      return cartCreated;
    } catch (error) {
      throw new error();
    }
  }
  addProductInCart = (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const { quantity = 1 } = req.body;
      //checkUserCart();
      const productById = PServices.getProductById(pid);

      if (productById) {
        const createdProduct = CServices.addProductToCart(cid, pid, quantity);
        if (createdProduct) {
          return res.status(201).json({
            status: "success",
            msg: "product added to cart",
            payload: createdProduct,
          });
        } else {
          return res.status(400).json({
            status: "error",
            msg: "The product was not added to the cart",
          });
        }
      } else {
        return res
          .status(400)
          .json({ status: "error", msg: "No product found to add to cart" });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "could not add product to cart",
        error: error.message,
      });
    }
  };
  deleteProductInCart = (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      checkUserCart();
      const { quantity = 1 } = req.body;
      //cambiar productos a nueva arquitectura
      const productById = PServices.getProductById(pid);

      if (productById) {
        const deletedProduct = CServices.deleteProductInCart(
          cid,
          pid,
          quantity
        );

        if (deletedProduct) {
          return res.status(200).json({
            status: "success",
            msg: "product removed from cart",
            payload: deletedProduct,
          });
        } else {
          return res.status(400).json({
            status: "error",
            msg: "The product was not removed from the cart",
          });
        }
      } else {
        return res.status(400).json({
          status: "error",
          msg: "No product found to remove from cart",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "Could not remove product from cart",
        error: error.message,
      });
    }
  };
  deleteCart = (req, res) => {
    try {
      const cid = req.params.cid;
      checkUserCart();
      const cartToEmpty = CServices.deleteCart({ cid });
      if (cartToEmpty) {
        return res.status(200).json({
          status: "success",
          msg: "cart removed",
          payload: cartToEmpty,
        });
      } else {
        return res
          .status(400)
          .json({ status: "error", msg: "The indicated cart was not found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "error", msg: "Internal Server Error" });
    }
  };
}
export const cartsController = new CartsController();
