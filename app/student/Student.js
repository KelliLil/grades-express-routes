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
    avgPct: {
      type: Number,
      get() {
        // Calculate the total earned over the total possible
        const accumulatedScores = this.grades.reduce(
          (
            totals,

            // Destructure the grade object to get the earned and possible properties
            { earned, possible }
          ) => {
            // Avoid mutation of parameter 'totals'
            const [totalEarned, totalPossible] = totals;

            return [totalEarned + earned, totalPossible + possible];
          },

          // INITIALIZE 'totals' (the ACCUMULATOR)
          [0, 0]
        );

        // Destructure the accumulated scores
        const [earned, possible] = accumulatedScores;

        // Get the percentage, rounded to one decimal place and turn it BACK INTO A NUMBER
        return Number.parseFloat(((earned / possible) * 100).toFixed(1));
      },
    },
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
