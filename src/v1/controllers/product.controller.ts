import { Product } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ProductService from "../services/product.service";
import ProductSchema from "../schemas/product.schema";

async function createProduct(
  req: Request<{}, {}, Product>,
  res: Response,
  next: NextFunction
) {
  try {
    ProductSchema.createProductSchema.parse(req.body);
    const product: Product | null = await ProductService.createProduct(
      req.body
    );
    if (!product) {
      res.status(404).send({ message: "This product is not found" });
      return;
    } else {
      res.status(201).send(product);
      return;
    }
  } catch (err) {
    next(err);
  }
}
/////////////////////////////////////////////////////////
async function getProductById(
  req: Request<{ id: number }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const product: Product | null = await ProductService.getProductById(
      req.params.id
    );
    if (!product) {
      res.status(404).send({ message: "This product is not found" });
      return;
    } else {
      res.status(200).send(product);
      return;
    }
  } catch (err) {
    next(err);
  }
}
////////////////////////////////////////////////////////////////////////////////
async function updateProduct(
  req: Request<{ id: number }, {}, Product>,
  res: Response,
  next: NextFunction
) {
  try {
    ProductSchema.UpdateProductSchema.parse(req.body);
    const product: Product | null = await ProductService.updateProductById({
      ...req.body,
      id: +req.params.id,
    });
    if (!product) {
      res.status(404).send({ message: "This product is not found" });
      return;
    } else {
      res.status(200).send(product);
      return;
    }
  } catch (err) {
    next(err);
  }
}
/////////////////////////////////////////////////////////

async function deleteProductById(
  req: Request<{ id: number }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const product: Product | null = await ProductService.deleteProductById(
      req.params.id
    );
    if (!product) {
      res.status(404).send({ message: "This product is not found" });
      return;
    } else {
      res.status(204).send(product);
      return;
    }
  } catch (err) {
    next(err);
  }
}
/////////////////////////////////////////////////////////

const ProductController = {
  getProductById,
  deleteProductById,
  updateProduct,
  createProduct,
};
export default ProductController;
