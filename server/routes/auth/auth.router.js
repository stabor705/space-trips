import {Router} from "express";
import {loginUser, logoutUser, refreshToken, registerUser} from "./auth.controler.js";
import {validateRefreshToken} from "../../middleware/validateRefreshToken.js";
import {singleSession} from "../../middleware/session.js";

const authRouter = new Router();

authRouter.post('/auth/register', registerUser);
authRouter.post('/auth/login', loginUser,singleSession);
authRouter.post('/auth/logout', logoutUser);
authRouter.post('/auth/refreshToken', validateRefreshToken, refreshToken);

export default authRouter;
