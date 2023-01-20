import StudentController from "./student/controller.js";

StudentController.getStudents()
  .then((students) => {
    console.log(students);
  })
  .catch((err) => {
    console.log(err);
  });
