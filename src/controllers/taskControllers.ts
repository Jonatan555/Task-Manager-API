import { NextFunction, Request, Response } from "express";
import { taskSchema } from "../validations/taskSchema ";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;

      const taskCreate = {
        title,
        description,
        date,
        status,
        idUser: userID,
      };

      return res.status(200).json({ message: "Tasks!", taskCreate });
    } catch (error) {
      return next(error);
    }
  },
};
