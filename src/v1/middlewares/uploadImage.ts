import { NextFunction, Request, Response, Router } from "express";
import { uploadFile } from "../services/cloudinary.service";
import { z } from "zod";
import ProductSchema from "../schemas/product.schema";
import { Product } from "@prisma/client";
import { imageSchema } from "../schemas/schema";

const uploadImageMW = async (
  req: Request<{}, {}, Product>,
  res: Response,
  next: NextFunction
) => {
  console.log(req.path);
  if (req.path == "/" && ["POST", "PATCH"].includes(req.method)) {
    try {
      if (req.file) {
        z.object({ imageSchema }).parse(req.file);
        const url = await uploadFile(req.file);
        req.body.image = url || process.env.DEFAULT_USER_IMAGE || "";
        console.log(req.body);
      }
    } catch (err) {
      next(err);
      return;
    }
  }
  next();
};

export default uploadImageMW;
