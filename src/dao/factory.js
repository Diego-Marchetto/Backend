import mongoose from "mongoose";
import env from "../config/enviroment.config.js";
//mongo

import { cartsModel } from "./models/carts.model.js";
import { productModel } from "./models/products.model.js";
import { userModel } from "./models/users.model.js";
import { ticketsModel } from "./models/tickets.model.js";
//memory
import { cartsMemory } from "./memory/cart.memory.js";
import { productsMemory } from "./memory/products.memory.js";
import { userMemory } from "./memory/user.memory.js";

async function importModels() {
  let models;

  switch (env.persistence) {
    case "MONGO":
      models = {
        products: productModel,
        users: userModel,
        carts: cartsModel,
        tickets: ticketsModel,
      };
      break;

    case "MEMORY":
      console.log("Database: Persistencia en memoria");
      models = {
        products: productsMemory,
        users: userMemory,
        carts: cartsMemory,
        //tickets: ticketsMemory,
      };
      break;

    default:
      throw new Error(
        `El tipo de persistencia "${env.persistence}" no es válido.`
      );
  }

  return models;
}

export default importModels;
