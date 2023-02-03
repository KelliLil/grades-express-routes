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

  async login(username, password) {
    const loggedInUser = await User.login(username, password);

    return loggedInUser;
  },
};
const loggedInUser = await userController.login("john", "123456");
console.log(loggedInUser);

export default userController;
