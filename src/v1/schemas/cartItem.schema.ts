import { z } from "zod";

export const cartItemSchema = z.object({
  id: z
    .number({
      required_error: "CartItem ID is required",
      invalid_type_error: "CartItem ID must be a number",
    })
    .int()
    .positive(),
  productId: z
    .number({
      required_error: "Product ID is required",
      invalid_type_error: "Product ID must be a number",
    })
    .int()
    .positive(),
  cartId: z
    .number({
      required_error: "Cart ID is required",
      invalid_type_error: "Cart ID must be a number",
    })
    .int()
    .positive(),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int()
    .min(1, { message: "Quantity must be at least 1" }),
});

export type CartItemSchema = z.infer<typeof cartItemSchema>;
