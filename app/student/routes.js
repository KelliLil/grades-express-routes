import { Router } from "express";
import STUDENTS from "../GRADES.js";

const router = new Router();

// /api/student
// * DON'T REPEAT '/api/students' - it's already in app/index.js
router.get("/", (_, res) => {
  res.json(STUDENTS);
});

router.get("/attendance", (_, res) => {
  res.json(STUDENTS.map((student) => student.name));
});

router.get("/:id", (req, res) => {
  // * This is a string
  const { id } = req.params;

  const student = STUDENTS.find((student) => student.id === Number(id));

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

router.post("/", (req, res) => {
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

router.put("/:id/grades", (req, res) => {
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

router.delete("/:id", (req, res) => {
  res.json(STUDENTS.filter((student) => student.id !== Number(req.params.id)));
});

export default router;
