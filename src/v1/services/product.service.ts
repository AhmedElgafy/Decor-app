import { Product } from "@prisma/client";
import prisma from "../config/db";
import { deleteFile } from "./cloudinary.service";

async function getProductById(id: number): Promise<Product | null> {
  const product: Product | null = await prisma.product.findUnique({
    where: { id: id },
  });
  return product;
}
async function getAllProducts(): Promise<Product[] | null> {
  const product: Product[] | null = await prisma.product.findMany({});
  return product;
}
async function deleteProductById(id: number): Promise<Product | null> {
  const product: Product | null = await prisma.product.delete({
    where: { id: id },
  });
  product?.image && (await deleteFile(product?.image));
  return product;
}
async function updateProductById(newProduct: Product): Promise<Product | null> {
  if (newProduct.image) {
    const product: Product | null = await prisma.product.findUnique({
      where: { id: newProduct.id },
    });
    product?.image && (await deleteFile(product?.image));
  }
  const product: Product | null = await prisma.product.update({
    where: { id: newProduct.id },
    data: { ...newProduct },
  });
  return product;
}
async function createProduct(newProduct: Product): Promise<Product | null> {
  const product: Product | null = await prisma.product.create({
    data: newProduct,
  });
  return product;
}
const ProductService = {
  getProductById,
  deleteProductById,
  updateProductById,
  createProduct,
  getAllProducts,
};
export default ProductService;
