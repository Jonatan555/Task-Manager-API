import { describe, expect, it } from "vitest";
import { authServices } from "../services/authServices";
import { userRepositoryInMemory } from "../repositories/userRepositoryinMemory";
import "dotenv/config";

describe("test authentication", () => {
  const user = {
    email: "user1@email.com",
    password: "A!1234567",
  };

  it("should log the user in", async () => {
    const login = await authServices.login(user, userRepositoryInMemory);

    expect(login).toHaveProperty("token");
  });
});
