import jwt from "jsonwebtoken";

const { JWT_SECRET} = process.env;

export function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401)

  jwt.verify(token, JWT_SECRET, (error, token) => {
    if (error) {
      return res.status(401).json({message: error})
    }

    req.user = token.user;

    next()
  });
}
