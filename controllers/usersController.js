import { pool } from "../db/pool.js";
import { validationResult } from "express-validator";

export const getAllUsers = async (req, res) => {
  try{
    const { rows: users } = await pool.query(
      `SELECT *
       FROM users;
      `
    );
    if (users.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send(users)
    };
  } catch(error) {
    res.sendStatus(500);
  }
};

export const getOneUser = async (req, res) => {
  const { id } = req.params;
  try{
    const { rows: user } = await pool.query(`
      SELECT *
      FROM users
      WHERE id=$1;
      `, [id]);
    if (user.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send(user);
    }
  } catch(error) {
    res.sendStatus(500);
  }
};

export const getUserOrder = async (req, res) => {
  const { id } = req.params;
  try{
    const { rows: order } = await pool.query(`
      SELECT *
      FROM orders
      WHERE user_id=$1;
      `, [id]);
    if (order.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send(order);
    }
  } catch(error) {
    res.sendStatus(500);
  }
}

export const createNewUser = async (req, res) => {
  const {first_name, last_name, age} = req.body;
  const result = validationResult(req);

  if(!result.isEmpty()) {
    return res.send({ errors: result.array() });
  };

  try{
    const { rows: user } = await pool.query(`
    INSERT INTO users (first_name, last_name, age, active)
    VALUES ($1, $2, $3, $4) RETURNING *;
    `, [first_name, last_name, age, true]);
    if(user.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send(user[0]);
    }
  } catch(error) {
    res.sendStatus(500);
  }
};

export const editOneUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;
  const result = validationResult(req);

  if(!result.isEmpty()) {
    return res.send({ errors: result.array() });
  };
  
  try{
    const { rows: user} = await pool.query(`
      UPDATE users
      SET
        first_name = $1,
        last_name = $2,
        age = $3
      WHERE id = $4
      RETURNING *;
    `, [first_name, last_name, age, id]);
    if(user.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(201).json(user[0])
    }
  } catch(error) {
    console.log(error)
    res.status(500).send("Server error");
  }
};

export const checkActiveUser = async (req, res) => {
  const { id } = req.params;
  try{
    const { rows: order } = await pool.query(`
      SELECT 
        COUNT(id) AS order_count
      FROM orders
      WHERE user_id = $1;
    `, [id]);
    console.log(typeof order[0].order_count)

    if(order[0].order_count === "0") {
      const { rows: user } = await pool.query(`
        UPDATE users
        SET active = false
        WHERE id = $1
        RETURNING *;
      `, [id]);
      console.log(user);
      res.status(200).send("User has been set to inactive user.");
    } else {
      res.status(404).send("User is an active user");
    };
  } catch(error) {
    res.status(500).send("Server error");
  }
};

export const deleteOneUser = async (req, res) => {
  const { id } = req.params;
  try{
    const { rows: user } = await pool.query(`
    DELETE FROM users
    WHERE id = $1
    RETURNING *;
    `, [id]);
    if ( user.length === 0) {
      res.sendStatus(400);
    } else {
      res.status(200).send(user[0]);
    }
  } catch(error) {
    res.sendStatus(500);
  }
};