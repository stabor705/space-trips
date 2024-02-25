import {model, Schema} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    default: ['KLIENT']
  },
  banned: {
    type: Boolean,
    default: false,
  }
})

UserSchema.pre('save', async function (next) {
  const user = this;
  this.password = await bcrypt.hash(user.password, 10);
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
}

export const User = model('User', UserSchema);
