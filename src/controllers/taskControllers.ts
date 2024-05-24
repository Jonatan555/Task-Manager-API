import { NextFunction, Request, Response } from "express";
import { taskSchema } from "../validations/taskSchema";
import { taskServices } from "../services/taskServices";
import { taskRepository } from "../repositories/taskRepository";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;

      const task = {
        title,
        description,
        date,
        status,
        idUser: userID,
      };

      const taskCreated = await taskServices.create(task, taskRepository);

      return res.status(201).json({ message: "task created!", taskCreated });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;
      const {TaskID} = req.params 

      const task = {
        title,
        description,
        date,
        status,
        idUser: userID,
      };

      const taskupdate = await taskServices.update(TaskID, task, taskRepository);

      return res.status(201).json({ message: "task update!", taskupdate });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.userID;
      const {TaskID} = req.params 
      
      const taskDeleted = await taskServices.delete(TaskID, userID, taskRepository);

      return res.status(201).json({ message: "task update!", taskDeleted });
    } catch (error) {
      return next(error);
    }
  },
};

