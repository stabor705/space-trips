import jwt from "jsonwebtoken";

const {sign} = jwt;
const { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_SECRET, REFRESH_EXPIRES_IN} = process.env;

export function generateJwtToken(user) {
  return sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN} );
}

export function generateRefreshToken(user) {
  return sign({ user }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN} );
}

