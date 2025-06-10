import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export default function isIdExistMW(
  req: Request<{ id: number }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("isIdExistMW called with params:", req.params);
    const idSchema = z.object({
      id: z.number({
        required_error: "id is required",
        invalid_type_error: "id should be a number",
      }),
    });
    idSchema.parse({ id: Number(req.params.id) });
    next();
  } catch (err) {
    next(err);
  }
}
