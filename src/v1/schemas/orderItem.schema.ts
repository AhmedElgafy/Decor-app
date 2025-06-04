import { z } from "zod";

export const orderItemSchema = z.object({
  id: z.number().optional(),
  productId: z.number(),
  orderId: z.number(),
  quantity: z.number().min(1),
});
