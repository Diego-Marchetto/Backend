//@ts-check
import express from "express";
import { PServices } from "../services/products.service.js";
import { productsController } from "../controllers/products.controller.js";
export const realTimeProducts = express.Router();

realTimeProducts.get("/", productsController.getProductRealTime);
