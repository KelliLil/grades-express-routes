import { Schema, model } from "mongoose";
import gradeSchema from "./grade-schema.js";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      minLength: [3, "Student name must be at least 3 characters long"],
      trim: true,
      validate: {
        validator(name) {
          // Only allow letters and spaces (one space in between words)
          return /[a-zA-Z]+([\s][a-zA-Z]+)*/.test(name);
        },
        message:
          "Student name must only contain letters and only one space in between names",
      },
    },

    // Specify an array of subdocuments. Each subdocument will be a gradeSchema.
    grades: [gradeSchema],
  },
  {
    strict: "throw",

    // Don't include the __v field in the document
    versionKey: false,
  }
);

// Validation to prevent duplicate grade names
// Child schema validation must be done in the parent schema
studentSchema.path("grades").validate((grades) => {
  const gradeNames = grades.map((grade) => grade.name?.toLowerCase());

  // If the number of unique grade names is less than the number of grades, then there are duplicates
  return new Set(gradeNames).size === gradeNames.length;
}, "Grade names must be unique");

export default model("Student", studentSchema);
