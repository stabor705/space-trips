import {User} from "./user.mongo.js";

export async function createUser(email, password) {
  return User.create({email, password});
}

export async function findUserByEmail(email) {
  return User.findOne({email}, {__v: 0});
}

export async function userUpdate(id, user) {
  await User.updateOne({_id: id}, user)
}


export async function userFind() {
  return User.find({}, {password: 0, __v: 0});
}

