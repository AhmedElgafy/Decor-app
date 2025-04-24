import { z } from "zod";

const createProductSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),

  id: z.number({
    required_error: "ID is required",
    invalid_type_error: "ID must be a number",
  }),

  image: z
    .string({
      required_error: "Image URL is required",
      invalid_type_error: "Image must be a string",
    })
    .url("Image must be a valid URL"),

  price: z.number({
    message: "Price must be a number",
  }),

  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string",
  }),

  subCategoryId: z.number({
    required_error: "Sub-category ID is required",
    invalid_type_error: "Sub-category ID must be a number",
  }),

  cartId: z
    .number({
      invalid_type_error: "Cart ID must be a number",
    })
    .nullable(),

  wishlistId: z
    .number({
      invalid_type_error: "Wishlist ID must be a number",
    })
    .nullable(),
});
// Reuse the original schema
const UpdateProductSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .nonempty("Name cannot be empty")
    .optional(),

  id: z
    .number({
      required_error: "ID is required",
      invalid_type_error: "ID must be a number",
    })
    .min(1, "ID cannot be empty")
    .optional(),

  image: z
    .string({
      required_error: "Image URL is required",
      invalid_type_error: "Image must be a string",
    })
    .nonempty("Image URL cannot be empty")
    .url("Image must be a valid URL")
    .optional(),

  price: z
    .number({
      message: "Price must be a number",
    })
    .min(0.01, "Price cannot be empty")
    .optional(),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .nonempty("Description cannot be empty")
    .optional(),

  subCategoryId: z
    .number({
      required_error: "Sub-category ID is required",
      invalid_type_error: "Sub-category ID must be a number",
    })
    .min(1, "Sub-category ID cannot be empty")
    .optional(),

  cartId: z
    .number({
      invalid_type_error: "Cart ID must be a number",
    })
    .min(1, "Cart ID cannot be empty")
    .nullable()
    .optional(),

  wishlistId: z
    .number({
      invalid_type_error: "Wishlist ID must be a number",
    })
    .min(1, "Wishlist ID cannot be empty")
    .nullable()
    .optional(),
});
const ProductSchema = { createProductSchema, UpdateProductSchema };
export default ProductSchema;
