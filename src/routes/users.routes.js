//@ts-check
import express from "express";
import { userController } from "../controllers/users.controller.js";
export const usersRouter = express.Router();

usersRouter.get("/", userController.getAll);

usersRouter.post("/", userController.create);

usersRouter.put("/:id", userController.update);

usersRouter.delete("/:id", userController.delete);
