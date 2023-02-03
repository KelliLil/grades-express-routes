import User from "./User.js";

// TODO: Remove mongoose connection stuff
import mongoose from "mongoose";
import config from "../config.js";

mongoose.set("strictQuery", true);
mongoose
  .connect(config.dbConn)
  .then(() => {
    console.info("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

const userController = {
  create(username, password) {
    return User.create({ username, password });
  },
};

const newUser = await userController.create("john", "123456");
console.log(newUser);

export default userController;
