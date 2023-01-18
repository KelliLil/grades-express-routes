import express from "express";
import STUDENTS from "./GRADES.js";

const app = express();

app.get("/api/students", (_, res) => {
  res.json(STUDENTS);
});

app.listen(3000, () => {
  console.info("Server is running on port 3000");
});
