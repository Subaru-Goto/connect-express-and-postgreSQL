import { pool } from "../db/pool.js";
import { validationResult } from "express-validator";

export const getAllOrders = async (req, res) => {
  try{
    const { rows: orders } = await pool.query(
      `SELECT *
       FROM orders;
      `
    );
    if (orders.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send(orders)
    };
  } catch(error) {
    res.sendStatus(500);
  }
};

export const getOneOrder = async (req, res) => {
  const { id } = req.params;
  try{
    const { rows: order } = await pool.query(`
      SELECT *
      FROM orders
      WHERE id = $1;  
    `, [id]);
    if (order.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send(order[0]);
    }
  } catch(error) {
    res.sendStatus(500);
  }
};

export const createNewOrder = async (req, res) => {
  const { price, date, user_id } = req.body;
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  try{
    const { rows: order } = await pool.query(`
    INSERT INTO orders
    (price, date, user_id)
    VALUES($1, $2, $3)
    RETURNING *;
    `, [price, date, user_id]);
    if( order.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(201).send(order[0]);
    }
  } catch(error) {
    res.sendStatus(500);
  };
};

export const editOneOrder = async (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  try{
    const { rows: order } = await pool.query(`
      UPDATE orders
      SET
        price = $1,
        date = $2,
        user_id = $3
      WHERE id = $4
      RETURNING *;
    `, [price, date, user_id, id]);
    if(order.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(201).send(order[0]);
    };
  } catch (error) {
    res.sendStatus(500);
  };
};

export const deleteOneOrder = async (req, res) => {
  const { user_id } = req.params;
  try{
    const { rows: order } = await pool.query(`
    DELETE FROM orders
    WHERE user_id = $1
    RETURNING *;
    `, [user_id]);
    if(order.length === 0) {
      res.sendStatus(400);
    } else {
      res.status(200).send(order[0]);
    }
  } catch (error) {
    res.sendStatus(500);
  };
};