import { Schema, model } from "mongoose";
import GradeSchema from "./grade-schema.js";

const StudentSchema = new Schema({
  name: { type: String, required: [true, "Student name is required"] },
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
});

export default model("Student", StudentSchema);
