import { z } from "zod";

export const cartSchema = z.object({
  id: z
    .number({
      required_error: "Cart ID is required",
      invalid_type_error: "Cart ID must be a number",
    })
    .int()
    .positive(),
  userId: z
    .number({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a number",
    })
    .int()
    .positive(),
  count: z
    .number({
      required_error: "Count is required",
      invalid_type_error: "Count must be a number",
    })
    .int()
    .min(0, { message: "Count cannot be negative" }),
  total: z.union([
    z.number({
      required_error: "Total is required",
      invalid_type_error: "Total must be a number",
    }),
    z
      .string()
      .regex(/^\d+(\.\d+)?$/, { message: "Total must be a valid decimal" }),
  ]),
});

export type CartSchema = z.infer<typeof cartSchema>;
