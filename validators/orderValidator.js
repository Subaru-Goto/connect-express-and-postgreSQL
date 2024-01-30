import { body } from "express-validator";

export const orderValidator = () => [
  body("date").notEmpty().isISO8601(),
  body("user_id").notEmpty().isInt(),
  body("price").custom(value => {
    if (typeof value !== "number") {
      throw new Error("Price must be a numeric number");
    }
    return true;
  }),
];