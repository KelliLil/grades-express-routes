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

  async createGradeForStudentById(id, grade) {
    // Find the student by id
    // 'this' refers to the controller object
    const foundStudent = await this.getStudentById(id);

    // If the student is found, add the grade to the student's grades array
    if (foundStudent) {
      foundStudent.grades.push(grade);

      // Trigger the save middleware (validate, etc.)
      return foundStudent.save();
    }
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
  .createGradeForStudentById("63d81d16a92c37c6ea49b75b", {
    gradeType: "quiz",
    name: "Test Quiz",
    earned: 100,
    possible: 100,
  })
  .catch((err) => {
    if (err.name === "ValidationError") {
      console.error(err.message);
    }

    // console.error(err);
  });

console.log(updatedStudent);
export default controller;
