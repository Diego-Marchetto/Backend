import { Router } from "express";
import { CServices } from "../services/carts.service.js";
import { PServices } from "../services/products.service.js";
import { userController } from "../controllers/users.controller.js";
import UsersDTO from "../controllers/DTO/users.DTO.js";
export const viewsRouter = Router();

viewsRouter.get("/user-cart", async (req, res) => {
  try {
    let { _id } = req.session.user;
    let userFound = await userController.getUserById(_id);
    const cartFound = await CServices.getCartById(userFound.cid);
    const plainCart = cartFound.products.map((doc) => doc.toObject());
    //console.log(plainCart);
    return res.render("cart", { plainCart });
  } catch (e) {
    return res.render("error");
  }
});
viewsRouter.get("/product-details/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productFound = await PServices.getProductById(pid);
    const plainProduct = {
      _id: productFound._id.toString(),
      title: productFound.title,
      description: productFound.description,
      price: productFound.price,
      thumbnail: productFound.thumbnail,
      code: productFound.code,
      stock: productFound.stock,
      category: productFound.category,
    };
    console.log(plainProduct);
    return res.render("product-detail", { plainProduct });
  } catch (e) {
    return res.render("error");
  }
});
viewsRouter.get("/current", async (req, res) => {
  let user = req.session.user;
  console.log(user);
  let userDto = new UsersDTO(user);
  console.log(userDto);
  res.send({ message: "user", payload: userDto });
});

viewsRouter.get("/", (req, res) => {
  return res.render("index");
});
