import { Category, SubCategory } from "@prisma/client";
import prisma from "../config/db";
import { deleteFile } from "./cloudinary.service";
import { categorySchema } from "../schemas/category.schema";
// import { categorySchema } from "../schemas/category.schema";

async function getCategoryById(id: number): Promise<Category | null> {
  const category: Category | null = await prisma.category.findUnique({
    where: { id: id },
  });
  return category;
}
async function getCategorySubById(id: number): Promise<SubCategory[] | null> {
  const category = await prisma.category.findUnique({
    where: { id: id },
    include: { subCategories: true },
  });
  return category ? category.subCategories : null;
}

async function getAllCategories(): Promise<Category[] | null> {
  const categories: Category[] | null = await prisma.category.findMany({});
  return categories;
}

async function deleteCategoryById(id: number): Promise<Category | null> {
  const category: Category | null = await prisma.category.delete({
    where: { id: id },
  });
  category?.image && (await deleteFile(category?.image));
  return category;
}

async function updateCategoryById(
  newCategory: Category
): Promise<Category | null> {
  const validCategory = categorySchema.partial().parse(newCategory);
  if (validCategory.image) {
    const category: Category | null = await prisma.category.findUnique({
      where: { id: validCategory.id },
    });
    category?.image && (await deleteFile(category?.image));
  }
  const category: Category | null = await prisma.category.update({
    where: { id: validCategory.id },
    data: { ...validCategory },
  });
  return category;
}

async function createCategory(newCategory: Category): Promise<Category | null> {
  const validCategory = categorySchema
    .partial()
    .required({ name: true })
    .parse(newCategory);
  const category: Category | null = await prisma.category.create({
    data: validCategory,
  });
  return category;
}

const CategoryService = {
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
  createCategory,
  getAllCategories,
  getCategorySubById,
};

export default CategoryService;
