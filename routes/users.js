import express from "express";
import {
  getAllUsers,
  getOneUser,
  createNewUser,
  editOneUser,
  deleteOneUser,
  getUserOrder
} from "../controllers/usersController.js";
import { body } from "express-validator";

export const usersRouter = express.Router();

const userValidator = () => [
  body("first_name").notEmpty().isString().trim().escape(),
  body("last_name").notEmpty().isString().trim().escape(),
  body("age").notEmpty().isInt().custom(age => { 
    if(typeof age !== "number") {
      return new Error("Please input integer as a numeric.");
    }
    return true;
  }),
];

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getOneUser);
usersRouter.get("/:id/orders", getUserOrder);
usersRouter.post("/", userValidator(), createNewUser);
usersRouter.put("/:id", userValidator(), editOneUser);
usersRouter.delete("/:id", deleteOneUser);