import { z } from "zod";

export const categorySchema = z.object({
  id: z
    .number({
      required_error: "Category ID is required",
      invalid_type_error: "Category ID must be a number",
    })
    .int()
    .positive(),
  name: z
    .string({
      required_error: "Category name is required",
      invalid_type_error: "Category name must be a string",
    })
    .min(2, { message: "Category name must be at least 2 characters long" }),
  image: z
    .string({
      required_error: "Image URL is required",
      invalid_type_error: "Image URL must be a string",
    })
    .url({ message: "Image must be a valid URL" }),
  createdAt: z.date({
    required_error: "CreatedAt is required",
    invalid_type_error: "CreatedAt must be a date",
  }),
});

export type CategorySchema = z.infer<typeof categorySchema>;
