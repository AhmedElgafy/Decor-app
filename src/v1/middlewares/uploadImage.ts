import { NextFunction, Request, Response, Router } from "express";
import { uploadFile } from "../services/cloudinary.service";
import ProductSchema from "../schemas/product.schema";
import { Product } from "@prisma/client";

const uploadImageMW = async (
  req: Request<{}, {}, Product>,
  res: Response,
  next: NextFunction
) => {
  if (req.path == "/" && ["POST", "PATCH"].includes(req.method)) {
    try {
      ProductSchema.createProductSchema
        .partial()
        .required({ name: true, description: true, price: true })
        // .parse(req.body);
        .parse({
          ...req.body,
          ...(req.body.price && { price: Number(req.body.price) }),
        });
      if (req.file) {
        const url = await uploadFile(req.file);
        req.body.image = url || process.env.DEFAULT_USER_IMAGE || "";
      }
    } catch (err) {
      next(err);
      return;
    }
  }
  next();
};

export default uploadImageMW;
