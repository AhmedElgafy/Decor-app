import { z } from "zod";

export const rateSchema = z.object({
  id: z.number().int(),
  rating: z.number().min(1).max(5), // changed from value to rating
  userId: z.number().int(),
  productId: z.number().int(),
  comment: z.string().optional(), // added comment as optional
});

export type RateSchema = z.infer<typeof rateSchema>;
// filepath: d:\decor app\server\src\v1\schemas\rate.schema.ts
