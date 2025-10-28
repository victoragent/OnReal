import { hash, compare } from "bcryptjs";
import type { User } from "@prisma/client";
import { prisma } from "../db/prisma";
import { RegisterPayload } from "./validators";

export class AuthError extends Error {
  constructor(code: "USER_EXISTS" | "INVALID_CREDENTIALS", message: string) {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }

  code: "USER_EXISTS" | "INVALID_CREDENTIALS";
}

export async function registerUser(payload: RegisterPayload): Promise<User> {
  const existing = await prisma.user.findUnique({
    where: { email: payload.email }
  });
  if (existing) {
    throw new AuthError("USER_EXISTS", "An account with this email already exists.");
  }

  const passwordHash = await hash(payload.password, 12);
  return prisma.user.create({
    data: {
      email: payload.email,
      name: payload.name,
      passwordHash
    }
  });
}

export async function verifyUserCredentials(email: string, password: string): Promise<User | null> {
  const existing = await prisma.user.findUnique({
    where: { email }
  });
  if (!existing) {
    return null;
  }

  const valid = await compare(password, existing.passwordHash);
  if (!valid) {
    return null;
  }

  return existing;
}
