import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { registerUser, verifyUserCredentials, AuthError } from "./service";
import { prisma } from "../db/prisma";

describe("auth service", () => {
  beforeEach(async () => {
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("registers a new user and allows subsequent login", async () => {
    const user = await registerUser({
      email: "dev@example.com",
      password: "Passw0rd123",
      name: "OnReal Dev"
    });

    expect(user.email).toBe("dev@example.com");

    const verified = await verifyUserCredentials("dev@example.com", "Passw0rd123");
    expect(verified).not.toBeNull();
    expect(verified?.id).toBe(user.id);
  });

  it("prevents duplicate registrations", async () => {
    await registerUser({
      email: "dup@example.com",
      password: "Passw0rd123"
    });

    await expect(
      registerUser({
        email: "dup@example.com",
        password: "Passw0rd123"
      })
    ).rejects.toBeInstanceOf(AuthError);
  });

  it("returns null for invalid credentials", async () => {
    await registerUser({
      email: "user@example.com",
      password: "Passw0rd123"
    });

    const result = await verifyUserCredentials("user@example.com", "wrongpass");
    expect(result).toBeNull();
  });
});
