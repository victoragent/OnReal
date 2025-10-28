import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Za-z]/, "Password must contain letters")
  .regex(/\d/, "Password must contain numbers");

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required")
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(120, "Name is too long")
      .optional()
      .or(z.literal("").transform(() => undefined)),
    email: z.string().trim().email("Enter a valid email"),
    password: passwordSchema,
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export const registerPayloadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(120, "Name is too long")
    .optional(),
  email: z.string().trim().email("Enter a valid email"),
  password: passwordSchema
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
