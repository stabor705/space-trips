import jwt from "jsonwebtoken";
import {authenticate} from "./authenticate.js";

export function isAdmin(req, res, next) {
    if (req.user && req.user.roles.includes("ADMIN")) {
      next();
    } else {
      return res.status(403).json({message: "Nie masz uprawnień do wykonania tej akcji"});
    }
}
