import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env;

export function singleSession(req, res, next) {
  const sessions = req.app.get('SESSIONS');
  if (!sessions.size) {
    next();
    return;
  }

  const authHeader = req.headers['authorization'];
  const sessionIdHeader = req.headers['sessionid'];

  console.log(authHeader, sessionIdHeader)

  if (!authHeader || !sessionIdHeader) {
    next();
    return;
  }

  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    return res.sendStatus(409)
  }

  jwt.verify(token, JWT_SECRET, (error, token) => {
    if (error) {
      return res.status(409).json({message: error})
    }
    const userActiveSessionId = sessions.get(token.user._id);

    if (userActiveSessionId && userActiveSessionId !== sessionIdHeader) {
      return res.status(409).json({message: `Uzytkownik ${token.user.email} ma aktywną inną sesję`})
    }

    next()
  });
}
