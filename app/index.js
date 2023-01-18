import express from "express";
import STUDENTS from "./GRADES.js";

const app = express();

app.get("/api/students", (_, res) => {
  res.json(STUDENTS);
});

app.get("/api/students/attendance", (_, res) => {
  res.json(STUDENTS.map((student) => student.name));
});

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

// * This is a middleware
// Tell express to parse the request body as JSON
// Without this, req.body will be undefined
app.use(express.json());

app.post("/api/students", (req, res) => {
  const newStudent = req.body;

  if (newStudent.name) {
    // Avoid push - this is for demo purposes only
    STUDENTS.push(
      // * This is a spread operator
      // We will mix in the grades property with an empty array
      { ...newStudent, grades: [] }
    );

    // No persistence - but send back the updated temporary STUDENTS
    res.json(STUDENTS);
  } else {
    res.status(400).json({ message: "Student name is required" });
  }
});

app.put("/api/students/:id/grades", (req, res) => {
  // Id of the student to update
  const { id } = req.params;

  const student2Update = STUDENTS.find((student) => student.id === Number(id));

  if (student2Update) {
    // * This is a spread operator
    // We will mix in the grades property with an empty array
    student2Update.grades.push(req.body);

    // No persistence - but send back the updated temporary STUDENTS
    res.json(student2Update);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.delete("/api/students/:id", (req, res) => {
  res.json(STUDENTS.filter((student) => student.id !== Number(req.params.id)));
});

app.listen(3000, () => {
  console.info("Server is running on port 3000");
});
