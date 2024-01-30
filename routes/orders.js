import express from "express";
import {
  getAllOrders,
  getOneOrder,
  createNewOrder,
  editOneOrder,
  deleteOneOrder,
} from "../controllers/ordersController.js";
import { orderValidator } from "../validators/orderValidator.js";

export const ordersRouter = express.Router();

ordersRouter.get("/", getAllOrders);
ordersRouter.get("/:id", getOneOrder);
ordersRouter.post("/", orderValidator, createNewOrder);
ordersRouter.put("/:id", orderValidator, editOneOrder);
ordersRouter.delete("/:id", deleteOneOrder);