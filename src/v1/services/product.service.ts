import { Product, Rate, User } from "@prisma/client";
import prisma from "../config/db";
import { deleteFile } from "./cloudinary.service";
import { Paginated, ProductRate } from "../../types/prisma";
import ProductSchema from "../schemas/product.schema";
import createPagination, { paginationVars } from "../utils/createPagination";
import { Request } from "express";

async function getProductById(id: number): Promise<Product | null> {
  const product: Product | null = await prisma.product.findUnique({
    where: { id: id },
  });
  return product;
}
////////////////////////////////////////////////////////////////////////////////
async function getAllProducts(
  req: Request
): Promise<Paginated<Product> | null> {
  const { pageSize, page, baseUrl, skip } = paginationVars(req);
  const [product, count] = await Promise.all([
    prisma.product.findMany({
      take: pageSize,
      skip: skip,
    }),
    prisma.product.count(),
  ]);
  return createPagination<Product>({
    items: product,
    page: page,
    count: count,
    baseUrl: baseUrl,
    pageSize: pageSize,
  });
}
async function deleteProductById(id: number): Promise<Product | null> {
  const product = await prisma.product.delete({
    where: { id: id },
  });
  product?.image && (await deleteFile(product?.image));
  return product;
}
////////////////////////////////////////////////////////////////////////////////
async function updateProductById(newProduct: Product): Promise<Product | null> {
  const validProduct = ProductSchema.UpdateProductSchema.parse(newProduct);

  if (validProduct.image) {
    const product: Product | null = await prisma.product.findUnique({
      where: { id: validProduct.id },
    });
    product?.image && (await deleteFile(product?.image));
  }
  const product: Product | null = await prisma.product.update({
    where: { id: validProduct.id },
    data: { ...validProduct },
  });
  return product;
}
async function createProduct<T>(newProduct: T): Promise<Product | null> {
  const product: Product | null = await prisma.product.create({
    data: newProduct as Product,
  });
  return product;
}
////////////////////////////////////////////////////////////////////////////////
async function getProductRate(id: number): Promise<ProductRate | null> {
  const productRate = await prisma.product.findUnique({
    where: { id: id },
    select: {
      rates: { include: { user: { select: { name: true, image: true } } } },
    },
  });
  return productRate;
}
const ProductService = {
  getProductById,
  deleteProductById,
  getProductRate,
  updateProductById,
  createProduct,
  getAllProducts,
};
export default ProductService;
