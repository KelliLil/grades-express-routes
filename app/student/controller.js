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

const controller = {
  getStudents() {
    return Student.find();
  },

  getStudentById(id) {
    return Student.findById(id);
  },

  createStudent(student) {
    return Student.create(student);
  },

  // TODO: Add method to create a new student (scores can be empty)

  // TODO: Add method to update a single student's name by id

  // TODO: Add method to update a single score by student id and score id

  // TODO: Add method to delete a single score by student id and score id

  // TODO: Add method to delete a single student by id
};

const createdStudent = await controller
  .getStudentById("63d81d16a92c37c6ea49b75b")
  .catch((err) => {
    console.error(err);
    console.error(err.message);
  });

console.log(createdStudent);
export default controller;
