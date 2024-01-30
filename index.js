import 'dotenv/config';
import express from "express";
import { usersRouter } from './routes/users.js';
import { ordersRouter } from './routes/orders.js';

const app = express();
const PORT = process.env.port || 8000;

app.use(express.json());
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

app.listen(PORT, () => {
  console.log(`This app is listening on ${PORT}.`);
});
