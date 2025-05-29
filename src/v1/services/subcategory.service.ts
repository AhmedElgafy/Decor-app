import { SubCategory } from "@prisma/client";
import prisma from "../config/db";
import { deleteFile } from "./cloudinary.service";
import { SubCategoryProducts } from "../../types/prisma";
import { subCategorySchema } from "../schemas/subcategory.schema";

async function getSubCategoryById(id: number): Promise<SubCategory | null> {
  const subcategory: SubCategory | null = await prisma.subCategory.findUnique({
    where: { id: id },
  });
  return subcategory;
}

async function getAllSubCategories(): Promise<SubCategory[] | null> {
  const subcategories: SubCategory[] | null = await prisma.subCategory.findMany(
    {}
  );
  return subcategories;
}

async function deleteSubCategoryById(id: number): Promise<SubCategory | null> {
  const subcategory: SubCategory | null = await prisma.subCategory.delete({
    where: { id: id },
  });
  subcategory?.image && (await deleteFile(subcategory?.image));
  return subcategory;
}

async function updateSubCategoryById(
  newSubCategory: SubCategory
): Promise<SubCategory | null> {
  const validSubCategory = subCategorySchema.partial().parse(newSubCategory);
  if (validSubCategory.image) {
    const subcategory: SubCategory | null = await prisma.subCategory.findUnique(
      {
        where: { id: validSubCategory.id },
      }
    );
    subcategory?.image && (await deleteFile(subcategory?.image));
  }
  const subcategory: SubCategory | null = await prisma.subCategory.update({
    where: { id: validSubCategory.id },
    data: { ...validSubCategory },
  });
  return subcategory;
}

async function createSubCategory(
  newSubCategory: SubCategory
): Promise<SubCategory | null> {
  const validSubCategory = subCategorySchema
    .partial()
    .required({ name: true, categoryId: true })
    .parse(newSubCategory);
  const subcategory: SubCategory | null = await prisma.subCategory.create({
    data: validSubCategory,
  });
  return subcategory;
}
async function getSubcategoryProducts(
  id: number
): Promise<SubCategoryProducts | null> {
  const subcategoryProducts = await prisma.subCategory.findUnique({
    where: { id: id },
    include: { products: true },
  });
  return subcategoryProducts;
}

const SubCategoryService = {
  getSubCategoryById,
  deleteSubCategoryById,
  updateSubCategoryById,
  createSubCategory,
  getSubcategoryProducts,
  getAllSubCategories,
};

export default SubCategoryService;
