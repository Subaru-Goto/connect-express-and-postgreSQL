import express from "express";
import { body } from "express-validator";
import {
  getAllOrders,
  getOneOrder,
  createNewOrder,
  editOneOrder,
  deleteOneOrder,
} from "../controllers/ordersController.js";

export const ordersRouter = express.Router();

const validateOrder = () => [
  body("date").notEmpty().isISO8601(),
  body("user_id").notEmpty().isNumeric(),
  body("price").custom(value => {
    if (typeof value !== "number") {
      throw new Error("Price must be a numeric number");
    }
    return true;
  }),
];

ordersRouter.get("/", getAllOrders);
ordersRouter.get("/:id", getOneOrder);
ordersRouter.post("/", validateOrder(), createNewOrder);
ordersRouter.put("/:id", validateOrder(), editOneOrder);
ordersRouter.delete("/:id", deleteOneOrder);