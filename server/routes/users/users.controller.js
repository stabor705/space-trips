import {userFind, userUpdate} from "../../models/user/user.model.js";

export async function getUsers(request, response) {
  return response.status(200).json(await userFind());
}

export async function updateUser(request, response) {
  const {user} = request.body;
  try {
    return response.status(200).json(await userUpdate(user._id, user));
  } catch (e) {
    return response.sendStatus(404);
  }
}
