import { Product } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ProductService from "../services/product.service";
import ProductSchema from "../schemas/product.schema";
import { deleteFile, uploadFile } from "../services/cloudinary.service";
/////////////////////////////////////////////////////////

async function createProduct(
  req: Request<{}, {}, Product>,
  res: Response,
  next: NextFunction
) {
  try {
    const product: Product | null = await ProductService.createProduct(
      req.body
    );

    res.status(201).send(product);
    return;
  } catch (err) {
    req.body.image && (await deleteFile(req.body.image));
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
    const validId = ProductSchema.createProductSchema
      .partial()
      .required({ id: true })
      .parse({ id: Number(req.params.id) });
    const product: Product | null = await ProductService.getProductById(
      Number(validId.id)
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
    const validId = ProductSchema.createProductSchema
      .partial()
      .required({ id: true })
      .parse({ id: Number(req.params.id) });
    console.log(validId);
    const product: Product | null = await ProductService.deleteProductById(
      validId.id
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
async function getAllProducts(
  req: Request<{ id: number }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const product: Product[] | null = await ProductService.getAllProducts();
    if (!product?.length) {
      res.status(404).send({ message: "no products found" });
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
const ProductController = {
  getProductById,
  deleteProductById,
  updateProduct,
  createProduct,
  getAllProducts,
};
export default ProductController;
