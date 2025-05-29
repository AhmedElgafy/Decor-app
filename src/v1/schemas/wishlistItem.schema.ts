import { z } from "zod";

export const wishlistItemSchema = z.object({
  id: z
    .number({
      required_error: "WishlistItem ID is required",
      invalid_type_error: "WishlistItem ID must be a number",
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
  wishlistId: z
    .number({
      required_error: "Wishlist ID is required",
      invalid_type_error: "Wishlist ID must be a number",
    })
    .int()
    .positive(),
  // No quantity for wishlist items
});

export type WishlistItemSchema = z.infer<typeof wishlistItemSchema>;
