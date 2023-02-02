import express from "express";
import config from "./config.js";
import studentRoutes from "./student/routes.js";

const app = express();

// Tell express to parse the request body as JSON
// Without this, req.body will be undefined
// * THIS MIDDLEWARE MUST BE BEFORE THE ROUTES
app.use(express.json());

// Any requests to /api/students will be handled by studentRoutes
app.use("/api/students/", studentRoutes);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(config.port, () => {
  console.info(`Server running on: http://localhost:${config.port}`);
});
