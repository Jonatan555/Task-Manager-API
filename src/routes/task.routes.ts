import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

export const taskRoutes = Router();

taskRoutes.use(authMiddleware);

taskRoutes.post("/task", authMiddleware, taskControllers.create);
taskRoutes.put("/task/:taskiD", authMiddleware, taskControllers.update);
taskRoutes.delete("/task/.taskID", taskControllers,delete):
