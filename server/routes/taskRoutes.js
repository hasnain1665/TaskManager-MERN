import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createTaskController,
  deleteTaskController,
  getTasksController,
  singleTaskController,
  updateTaskController,
} from "../controllers/taskController.js";

const router = express.Router();

// Create a new task
router.post("/tasks", requireSignIn, createTaskController);

// Fetch all tasks
router.get("/tasks", requireSignIn, getTasksController);

// Fetch a single tasks
router.get("/tasks/:id", requireSignIn, singleTaskController);

// Update a task
router.put("/tasks/:id", requireSignIn, updateTaskController);

//  Delete a task
router.delete("/tasks/:id", requireSignIn, deleteTaskController);

export default router;
