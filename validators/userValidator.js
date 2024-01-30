import { body } from "express-validator";

export const userValidator = () => [
  body("first_name").notEmpty().isString().trim().escape(),
  body("last_name").notEmpty().isString().trim().escape(),
  body("age").notEmpty().isInt().custom(age => { 
    if(typeof age !== "number") {
      return new Error("Please input integer as a numeric.");
    }
    return true;
  }),
];