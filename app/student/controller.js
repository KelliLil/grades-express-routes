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

  // updatedName is an object with a name property from the request body
  updateStudentNameById(id, updatedName) {
    return Student.findByIdAndUpdate(
      id,
      { name: updatedName.name },
      { rawResult: true }
    );
  },

  // TODO: Add method to update a single score by student id and score id

  // TODO: Add method to delete a single score by student id and score id

  // TODO: Add method to delete a single student by id
};

const updatedStudent = await controller
  .updateStudentNameById("63d81d16a92c37c6ea49b75b", {
    name: "John Raw Result Doe",
  })
  .catch((err) => {
    console.error(err);
    console.error(err.message);
  });

console.log(updatedStudent);
export default controller;
