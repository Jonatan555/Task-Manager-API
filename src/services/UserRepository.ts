import { sqliteConnection } from "../databases/sqlite3";
import { UserDataType } from "../validations/userSchema";

export type CreateUserDatatype = UserDataType & { id: string };

export const userRepository = {
  async createUser(data: CreateUserDatatype) {
    try {
      const { id, name, email, password } = data;

      const db = await sqliteConnection();

      const querySQL =
        "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?);";

      await db.run(querySQL, [id, name, email, password]);

      return { id };
    } catch (error) {
      throw error;
    }
  },
};
