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

router.get("/grades/avg", async (_, res) => {
  studentController
    .getCumulativeClassAvgScore()
    .then((avgScore) => {
      res.json({ avgScore });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
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

// Update the student name
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // 'value' comes from the raw MongoDB response
  const { value } = await studentController
    .updateStudentNameById(id, name)
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
        res.status(400).json({ message: "Invalid ID" });
      } else if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });

  if (value) {
    res.json(value);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// Add a grade to the student
router.put("/grade/:id", async (req, res) => {
  const { id } = req.params;
  const updatedStudent = await studentController
    .updateStudentWithGrade(id, req.body)
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
        res.status(400).json({ message: "Invalid ID" });
      } else if (err.message === "Student not found") {
        res.status(404).json({ message: err.message });
      } else if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });

  if (updatedStudent) {
    res.json(updatedStudent);
  }
});

router.put("/grade/update/:id", async (req, res) => {
  const { id } = req.params;
  const updatedStudent = await studentController
    .updateStudentScoreByGradeName(id, req.body)
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
        res.status(400).json({ message: "Invalid ID" });
      } else if (err.message === "Student not found") {
        res.status(404).json({ message: err.message });
      } else if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });

  if (updatedStudent) {
    res.json(updatedStudent);
  }
});

router.put("/grades/name", async (req, res) => {
  const { originalName, newName } = req.body;

  const updatedResult = await studentController
    .updateGradeName(originalName, newName)
    .catch((err) => {
      console.error("ERROR MESSAGE", err);
      if (err.message === "Invalid grade name(s)") {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });

  if (updatedResult.modifiedCount) {
    res.json(updatedResult);
  } else {
    res.status(404).json({ message: "Grade not found" });
  }
});

router.put("/grades/curve", async (req, res) => {
  const { gradeName, curveAmt } = req.body;

  const updatedResult = await studentController.updateGradeWithCurve(
    gradeName,
    curveAmt
  );

  if (updatedResult.modifiedCount) {
    res.json(updatedResult);
  } else {
    res.status(404).json({ message: "Grade not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  studentController.deleteStudentById(id).then((result) => {
    if (result.deletedCount) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  });
});

export default router;
