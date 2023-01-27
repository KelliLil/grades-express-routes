import mongoose from "mongoose";
import config from "../config.js";
import Student from "./Student.js";

mongoose.set("strictQuery", true);
mongoose
  .connect(config.getDbConn("students"))
  .then(() => {
    console.info("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

export const controller = {
  getStudents() {
    return Student.find();
  },

  // TODO: Set up the corresponding route in app/student/routes.js 👇🏾

  // TODO: Add method to get a single student by id

  // TODO: Add method to create a new student (scores can be empty)

  // TODO: Add method to update a single student's name by id

  // TODO: Add method to update a single score by student id and score id

  // TODO: Add method to delete a single score by student id and score id

  // TODO: Add method to delete a single student by id
};

export default controller;
