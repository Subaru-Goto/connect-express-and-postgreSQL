import express from "express";
import {
  getAllUsers,
  getOneUser,
  createNewUser,
  editOneUser,
  deleteOneUser,
  getUserOrder
} from "../controllers/usersController.js";
import { userValidator } from "../validators/userValidator.js";

export const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getOneUser);
usersRouter.get("/:id/orders", getUserOrder);
usersRouter.post("/", userValidator, createNewUser);
usersRouter.put("/:id", userValidator, editOneUser);
usersRouter.delete("/:id", deleteOneUser);