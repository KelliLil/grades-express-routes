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
    if (mongoose.Types.ObjectId.isValid(id)) {
      // Find the student by id
      // 'this' refers to the controller object
      const foundStudent = await this.getStudentById(id);

      // If the student is found, add the grade to the student's grades array
      if (foundStudent) {
        foundStudent.grades.push(grade);

        // Trigger the save middleware (validate, etc.)
        return foundStudent.save();
      }
    } else {
      throw new Error("Invalid student id");
    }
  },

  // updatedName is an object with a name property from the request body
  updateStudentNameById(id, updatedName) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return Student.findByIdAndUpdate(
        id,
        { name: updatedName.name },
        { rawResult: true }
      );
    }
  },

  async updateStudentScoreByGradeName(studentId, updatedGrade) {
    if (mongoose.Types.ObjectId.isValid(studentId)) {
      // Find the student by id
      // 'this' refers to the controller object
      const foundStudent = await this.getStudentById(studentId);

      // If the student is found, update the grade
      if (foundStudent) {
        const grade2Update = foundStudent.grades.find(
          (grade) => grade.name === updatedGrade.name
        );

        if (grade2Update) {
          grade2Update.earned = updatedGrade.earned;

          // Trigger the save middleware (validate, etc.)
          return foundStudent.save();
        }

        throw new Error("Grade not found. Did you enter the correct name?");
      } else {
        throw new Error("Student not found");
      }
    } else {
      throw new Error("Invalid student id");
    }
  },

  updateGradeName(originalGradeName, updatedGradeName) {
    return Student.updateMany(
      { "grades.name": originalGradeName },
      { $set: { "grades.$.name": updatedGradeName } },
      { multi: true }
    );
  },

  // TODO: Add method to delete a single score by student id and score id

  // TODO: Add method to delete a single student by id
};

const gradeNameUpdateResults = await controller
  .updateGradeName("Quiz 1", "Quiz 1 - Updated")
  .catch((err) => {
    console.error(err);
  });

console.log(gradeNameUpdateResults);
export default controller;
