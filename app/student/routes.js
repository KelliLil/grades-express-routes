import { Router } from "express";
import mongoose from "mongoose";
import studentController from "./controller.js";

const router = new Router();

// /api/student
// * DON'T REPEAT '/api/students' - it's already in app/index.js
router.get("/", (_, res) => {
  studentController
    .getStudents()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", async (req, res) => {
  const foundStudent = await studentController
    .getStudentById(req.params.id)
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
        res.status(400).json({ message: "Invalid ID" });
      } else {
        res.status(500).json({ message: err.message });
      }
    });

  if (foundStudent) {
    res.json(foundStudent);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

router.get("/avg/:id", async (req, res) => {
  const avgScore = await studentController
    .getAvgScoreByStudentId(req.params.id)
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
        res.status(400).json({ message: "Invalid ID" });
      } else if (err.message === "Student not found") {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });

  if (avgScore) {
    res.json({ avgScore });
  }
});

router.post("/", async (req, res) => {
  const newStudent = await studentController
    .createStudent(req.body)
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });

  if (newStudent) {
    res.status(201).json(newStudent);
  }
});

export default router;
