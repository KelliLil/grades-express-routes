import { Schema, model } from "mongoose";

export default model(
  "Student",
  new Schema({
    name: String,
  })
);
