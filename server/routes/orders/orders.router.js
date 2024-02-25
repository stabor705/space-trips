import {Router} from "express";
import {addNewOrder, getAllOrdersByUserId} from "./orders.controller.js";

import {authenticate} from "../../middleware/authenticate.js";
import {singleSession} from "../../middleware/session.js";

const ordersRouter = new Router();

ordersRouter.post('/orders', authenticate,singleSession, getAllOrdersByUserId);

export default ordersRouter;
