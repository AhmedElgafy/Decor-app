import { boolean, z } from "zod";

export const subCategorySchema = z.object({
  id: z
    .number({
      required_error: "Subcategory ID is required",
      invalid_type_error: "Subcategory ID must be a number",
    })
    .int("Subcategory ID must be an integer"),
  name: z
    .string({
      required_error: "Subcategory name is required",
      invalid_type_error: "Subcategory name must be a string",
    })
    .min(1, "Subcategory name cannot be empty"),
  image: z
    .string({
      required_error: "Image URL is required",
      invalid_type_error: "Image URL must be a string",
    })
    .url("Image must be a valid URL"),
  categoryId: z
    .any({
      required_error: "Category ID is required",
    })
    .transform((val) => Number(val))
    .refine(
      (val) => {
        return !isNaN(val) && val > 0;
      },
      {
        message: "Category ID must be a valid number",
      }
    ),
});

export type SubCategorySchema = z.infer<typeof subCategorySchema>;
