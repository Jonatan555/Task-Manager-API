import { randomUUID } from "node:crypto";
import { TaskDataType } from "../validations/taskSchema";
import { appError } from "../errors/appError";

export type CreateTaskDataTypes = TaskDataType & { idUser: string };
export type UpdateTaskDataTypes = TaskDataType & { id_User: string };

export type TaskRepositoryTypes = {
  createTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  getTask(id: string): Promise<UpdateTaskDataTypes | undefined>;
  updateTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  deleteTask(id: string): Promise<{} | undefined>;
};

export const taskServices = {
  async create(data: CreateTaskDataTypes, repository: TaskRepositoryTypes) {
    try {
      const { title, description, date, status, idUser } = data;

      const task = {
        id: randomUUID(),
        title,
        description,
        date,
        status,
        idUser,
      };

      const taskCreated = await repository.createTask(task);

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },
  async update(
    TaskID: string,
    data: CreateTaskDataTypes,
    repository: TaskRepositoryTypes
  ) {
    try {
      const { title, description, date, status, idUser } = data;

      const task = {
        id: TaskID,
        title,
        description,
        date,
        status,
        idUser,
      };

      const userTask = await repository.getTask(TaskID);
      if (!userTask) throw appError("task not found", 404);

      if (userTask.id_User != idUser) {
        throw appError("user not authorizated to update task", 401);
      }

      const taskupdate = await repository.updateTask(task);

      return taskupdate;
    } catch (error) {
      throw error;
    }
  },
  
  
  async delete(
    TaskID: string,
    userID: string,
    repository: TaskRepositoryTypes
  ) {
    try {

      const userTask = await repository.getTask(TaskID);
      if (!userTask) throw appError("task not found", 404);

      if (userTask.id_User != userID) {
        throw appError("user not authorizated to delete task", 401);
      }

        const taskDeleted = await repository.deleteTask(TaskID);
        if (!taskDeleted) throw appError("task not deleted!", 500);

      return TaskID;
    } catch (error) {
      throw error;
    }
  },
};
