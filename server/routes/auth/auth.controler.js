import { v4 as uuidv4 } from 'uuid';
import lodash from "lodash";
import {generateJwtToken, generateRefreshToken} from "../../core/auth/jwt.js";
import {createUser, findUserByEmail} from "../../models/user/user.model.js";

export async function registerUser(request, response) {
  const {email, password} = request.body;
  const sessions = request.app.get('SESSIONS');
  try {
    const user = await createUser(email, password);
    return response.status(201).json(createAuthResponsePayload(user, sessions));
  } catch (e) {
    return response.status(400).json({type: 'error', message: `Użytkownik ${email} już istnieje`});
  }
}

export async function loginUser(request, response) {
  const {email, password} = request.body;
  const sessions = request.app.get('SESSIONS');
  const user = await findUserByEmail(email)

  if (!user) {
    return response.status(400).json({type: 'error', message: 'Nie znaleziono użytkownika'});
  }

  const validate = await user.isValidPassword(password);

  if (!validate) {
    return response.status(400).json({type: 'error', message: 'Hasło jest niepoprawne'});
  }

  return response.status(200).json(createAuthResponsePayload(user, sessions));
}

export async function logoutUser(request, response) {
  return response.status(200).json({type: 'success', message: `Użytkownik ${email} wylogowany`});
}

export async function refreshToken(request, response) {
  const {refreshToken} = request.body;
  const sessions = request.app.get('SESSIONS');
  return response.status(200).json(createAuthResponsePayload(request.user, sessions, refreshToken));
}


function createAuthResponsePayload(user, sessions, token = false) {
  const accessToken = generateJwtToken(user);
  const refreshToken = token ? token : generateRefreshToken(user);
  const sessionId = uuidv4();
  sessions.set(user._id.valueOf(), sessionId);
  return {
    type: 'success',
    message: `Użytkownik ${user.email} zalogowany`,
    accessToken,
    refreshToken,
    sessionId,
    user: lodash.pick(user, ['_id', 'email', 'roles', 'banned'])
  }
}
