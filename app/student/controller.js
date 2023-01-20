import mongoose from "mongoose";
import config from "../config.js";
import Student from "./Student.js";

// Connect to the database
mongoose
  .connect(config.getDbConn("students"))
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

export default {
  getStudents() {
    return Student.find();
  },
};
