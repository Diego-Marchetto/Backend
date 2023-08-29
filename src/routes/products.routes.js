import { Router } from "express";
export const productsRouter = Router();

import { productsController } from "../controllers/products.controller.js";
import { checkAdmin } from "../middlewares/authenticate.js";

productsRouter.get("/", productsController.getAll);

productsRouter.get("/:id", productsController.getProductById);

productsRouter.post("/", checkAdmin, productsController.createProduct);

productsRouter.put("/:id", checkAdmin, productsController.updateProduct);

productsRouter.delete("/:id", checkAdmin, productsController.deleteProduct);
