import { Router } from "express";
import userController from "./controller.js";

const router = new Router();

router.post("/create", async (req, res) => {
  const { username, password } = req.body;
  const user = await userController.create(username, password);
  res.json(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const jwt = await userController.login(username, password);
  if (jwt) {
    res.json(jwt);
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});
export default router;
