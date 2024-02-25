import jwt from "jsonwebtoken";

const { REFRESH_SECRET } = process.env;

export function validateRefreshToken(req, res, next) {
  const {refreshToken} =  req.body;
  if (!refreshToken) return res.sendStatus(401)

  jwt.verify(refreshToken, REFRESH_SECRET, (error, token) => {
    if (error) {
      return res.status(400).json({message: error})
    }

    req.user = token.user;

    next()
  });
}
