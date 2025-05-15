import { z } from "zod";
import { imageSchema } from "./schema";

const createProductSchema = z.object({
  id: z.number({
    required_error: "ID is required",
    invalid_type_error: "ID must be a number",
  }),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .nonempty("Name can not be empty"),
  image: imageSchema,

  price: z
    .number({
      required_error: "price is required",
      invalid_type_error: "price should be a number",
    })
    .min(0, "price shouldn't be empty")
    .optional(),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .nonempty("Description can not be empty"),
  subCategoryId: z.number({
    required_error: "Sub-category ID is required",
    invalid_type_error: "Sub-category ID must be a number",
  }),
  cartId: z.number({
    invalid_type_error: "Cart ID must be a number",
  }),
  wishlistId: z.number({
    invalid_type_error: "Wishlist ID must be a number",
  }),
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
