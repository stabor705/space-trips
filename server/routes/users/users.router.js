import {Router} from "express";
import {getUsers, updateUser} from "./users.controller.js";
import {singleSession} from "../../middleware/session.js";

import {authenticate} from "../../middleware/authenticate.js";
import {isAdmin} from "../../middleware/authAdmin.js";

const usersRouter = new Router();

usersRouter.get('/users',
  authenticate,
  isAdmin,
  singleSession,
  getUsers
);
usersRouter.patch('/users',
  authenticate,
  isAdmin,
  singleSession,
  updateUser
);

export default usersRouter;
