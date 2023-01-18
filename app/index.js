import express from "express";
import STUDENTS from "./GRADES.js";

const app = express();

app.get("/api/students", (_, res) => {
  res.json(STUDENTS);
});

app.get("/api/students/attendance", (_, res) => {
  res.json(STUDENTS.map((student) => student.name));
});

// ! RECORDING
app.get("/api/students/:id", (req, res) => {
  // * This is a string
  const { id } = req.params;

  const student = STUDENTS.find((student) => student.id === Number(id));

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.listen(3000, () => {
  console.info("Server is running on port 3000");
});
