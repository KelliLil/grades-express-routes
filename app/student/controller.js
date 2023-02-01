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

  async getAvgScoreByStudentId(id) {
    const student = await this.getStudentById(id);

    if (student) {
      return student.avgPct;
    }

    throw new Error("Student not found");
  },

  async getCumulativeClassAvgScore() {
    const students = await this.getStudents();

    return (
      students.reduce((avg, { avgPct }) => avg + avgPct, 0) / students.length
    );
  },

  // `student` is expected to validate against the Student schema
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

    throw new Error("Student not found");
  },

  updateStudentNameById(id, name) {
    return Student.findByIdAndUpdate(id, { name }, { rawResult: true });
  },

  async updateStudentScoreByGradeName(studentId, updatedGrade) {
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
  },

  updateGradeName(originalGradeName, updatedGradeName) {
    return Student.updateMany(
      { "grades.name": originalGradeName },
      { $set: { "grades.$.name": updatedGradeName } },
      { multi: true }
    );
  },

  updateGradeWithCurve(originalGradeName, curve) {
    return Student.updateMany(
      { "grades.name": originalGradeName },
      { $inc: { "grades.$.earned": curve } },
      { multi: true }
    );
  },

  deleteStudentById(id) {
    return Student.findByIdAndDelete(id);
  },
};

export default controller;
