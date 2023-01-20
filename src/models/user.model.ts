import { model, Schema, Document } from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true
  },
  passwordResetToken: {
    type: String,
    required: false
  }
});

const userModel = model<User & Document>("User", userSchema);

export default userModel;
