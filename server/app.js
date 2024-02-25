import express from 'express';
import cors from 'cors';
import tripsRouter from "./routes/trips/trips.router.js";
import cartsRouter from "./routes/carts/carts.router.js";
import ordersRouter from "./routes/orders/orders.router.js";
import authRouter from "./routes/auth/auth.router.js";
import usersRouter from "./routes/users/users.router.js";

export const app = express()

app.set('SESSIONS', new Map());

app.use(express.json())
app.use(cors())

app.use(tripsRouter);
app.use(cartsRouter);
app.use(ordersRouter);
app.use(authRouter);
app.use(usersRouter);
