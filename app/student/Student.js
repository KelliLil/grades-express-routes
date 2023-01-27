import { Schema, model } from "mongoose";

// TODO: Create a schema for grades (https://github.com/manavm1990/node-mongo-mongoose-sample/blob/main/app/grade/Grade.js)
// TODO: Add SOME validation to the schema
export default model(
  "Student",
  new Schema({
    name: String,
  })
);
