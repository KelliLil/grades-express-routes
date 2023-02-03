import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../config.js";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [3, "Username must be at least 3 characters long"],
    trim: true,
    validate: {
      validator(username) {
        // Only allow letters and spaces (one space in between words)
        return /[a-zA-Z]+([\s][a-zA-Z]+)*/.test(username);
      },
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [3, "Password must be at least 3 characters long"],
    trim: true,
    validate: {
      validator(password) {
        // Only allow letters and spaces (one space in between words)
        return /[a-zA-Z]+([\s][a-zA-Z]+)*/.test(password);
      },
    },
  },
});

UserSchema.pre("save", async function (next) {
  // * Only hash the password if it has been modified (or is new)
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, config.saltRounds);
  }

  next();
});

export default model("User", UserSchema);
