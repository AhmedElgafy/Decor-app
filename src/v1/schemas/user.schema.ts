import { fa } from "@faker-js/faker/.";
import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  birthDate: z.string().datetime(), // ISO format
  gender: z.enum(["M", "F"]),
  password: z.string().min(6),
});
export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  birthDate: z.string().datetime().optional(), // ISO format
  gender: z.enum(["M", "F"]).optional(),
  password: z
    .string()
    .min(8, { message: "password should be at lest 8 characters" })
    .optional(),
});
export const LoginSchema = z.object({
  email: z.string().nonempty().email(),
  password: z
    .string()
    .nonempty()
    .min(8, { message: "password should be at lest 8 characters" }),
});
export type LoginType = z.infer<typeof LoginSchema>;
export type UserType = z.infer<typeof UserSchema>;
