import {Router} from "express";
import {
  addToCart,
  deleteCart, finalizeOrder,
  getCart,
  getCartByUserId,
  removeFromCart,
  updateItemInCart
} from "./carts.controller.js";
import {singleSession} from "../../middleware/session.js";
import {authenticate} from "../../middleware/authenticate.js";

const cartsRouter = Router();

cartsRouter.post('/cart/add',
  authenticate,
  singleSession,
  addToCart
);
cartsRouter.post('/cart/remove',
  authenticate,
  singleSession,
  removeFromCart
);
cartsRouter.patch('/cart',
  authenticate,
  singleSession,
  updateItemInCart
);
cartsRouter.get('/cart/:id',
  authenticate,
  singleSession,
  getCart
);
cartsRouter.post('/cart',
  // authenticate,
  // singleSession,
  getCartByUserId
);
cartsRouter.delete('/cart',
  authenticate,
  singleSession,
  deleteCart
);
cartsRouter.post('/cart/buy',
  authenticate,
  singleSession,
  finalizeOrder
);

export default cartsRouter;
