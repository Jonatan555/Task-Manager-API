import { sqliteConnection } from "../databases/sqlite3";
import {
  CreateTaskDataTypes,
  UserTaskPagination,
} from "../services/taskServices";

type CreateTaskTypes = CreateTaskDataTypes & { id: string };

export const taskRepository = {
  async createTask(data: CreateTaskTypes) {
    try {
      const { id, title, description, date, status, idUser } = data;

      const db = await sqliteConnection();

      const querySQL =
        "INSERT INTO tasks (id, title, description, date, status, id_user) VALUES (?, ?, ?, ?, ?, ?);";

      await db.run(querySQL, [id, title, description, date, status, idUser]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getTask(id: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "SELECT * FROM tasks WHERE id = ?;";

      const task = await db.get(querySQL, [id]);

      return task;
    } catch (error) {
      throw error;
    }
  },

  async updateTask(data: CreateTaskTypes) {
    try {
      const { id, title, description, date, status } = data;

      const db = await sqliteConnection();

      const querySQL = `
        UPDATE tasks 
        SET title = ?, description = ?, date = ?, status = ?
        WHERE id = ?;
      `;

      await db.run(querySQL, [title, description, date, status, id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async deleteTask(id: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "DELETE FROM tasks WHERE id = ?;";

      await db.run(querySQL, [id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getTasks(data: UserTaskPagination) {
    try {
      const { userID, limit, offset, filter } = data;

      const db = await sqliteConnection();

      if (filter == "all") {
        const querySQL = `SELECT * FROM tasks WHERE id_user = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`;

        const userTasks = await db.all(querySQL, [userID, limit, offset]);

        return userTasks;
      } else {
        const querySQL = `SELECT * FROM tasks WHERE id_user = ? AND status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?;`;

        const userTasks = await db.all(querySQL, [
          userID,
          filter,
          limit,
          offset,
        ]);
      }
    } catch (error) {
      throw error;
    }
  },
};
