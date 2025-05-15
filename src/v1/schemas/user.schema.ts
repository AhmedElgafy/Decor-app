import { z } from "zod";
import { imageSchema } from "./schema";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  birthDate: z.string().datetime(), // ISO format
  gender: z.enum(["M", "F"]),
  password: z.string().min(6),
});

//////////////////////////////////////////////////////////
export const UpdateUserSchema = z.object({
  name: z.string().nonempty({ message: "Name cannot be empty" }).optional(),
  email: z
    .string()
    .email()
    .nonempty({ message: "Email cannot be empty" })
    .optional(),
  phone: z.string().nonempty({ message: "Phone cannot be empty" }).optional(),
  birthDate: z
    .string()
    .datetime({ message: "Invalid birth date format" })
    .nonempty({ message: "Birth date cannot be empty" })
    .optional(),
  image: imageSchema,
  gender: z.enum(["M", "F"]).optional(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" })
    .nonempty({ message: "Password cannot be empty" })
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
