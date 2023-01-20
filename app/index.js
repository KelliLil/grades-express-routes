import express from "express";
import studentRoutes from "./student/routes.js";

const app = express();

// Tell express to parse the request body as JSON
// Without this, req.body will be undefined
// * THIS MIDDLEWARE MUST BE BEFORE THE ROUTES
app.use(express.json());

// Any requests to /api/students will be handled by studentRoutes
app.use("/api/students/", studentRoutes);

app.listen(3000, () => {
  console.info("Server is running on port 3000");
});
