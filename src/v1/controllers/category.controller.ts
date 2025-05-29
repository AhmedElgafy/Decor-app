import { Request, Response, NextFunction } from "express";
import { Category } from "@prisma/client";
import CategoryService from "../services/category.service";

// Get a single category by ID
async function getCategory(req: Request, res: Response) {
  const id = Number(req.params.id);
  const category = await CategoryService.getCategoryById(id);
  if (category) {
    res.status(200).send(category);
    return;
  } else {
    res.status(404).send({ message: "Category not found" });
    return;
  }
}
async function getCategorySubcategory(req: Request, res: Response) {
  const id = Number(req.params.id);
  const category = await CategoryService.getCategorySubById(id);
  if (category) {
    res.status(200).send(category);
    return;
  } else {
    res.status(404).send({ message: "Category not found" });
    return;
  }
}

// Get all categories
async function getAllCategories(req: Request, res: Response) {
  const categories = await CategoryService.getAllCategories();
  res.status(200).send(categories);
  return;
}

// Create a new category
async function createCategory(
  req: Request<{}, {}, Category>,
  res: Response,
  next: NextFunction
) {
  try {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).send(category);
    return;
  } catch (err) {
    next(err);
  }
}

// Update a category by ID
async function updateCategory(
  req: Request<{ id: number }, {}, Category>,
  res: Response,
  next: NextFunction
) {
  try {
    const category = await CategoryService.updateCategoryById({
      ...req.body,
      id: Number(req.params.id),
    });
    if (category) {
      res.status(200).send(category);
      return;
    } else {
      res.status(404).send({ message: "Category not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}

// Delete a category by ID
async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const category = await CategoryService.deleteCategoryById(id);
    if (category) {
      res.status(204).send({ message: "Category deleted successfully" });
      return;
    } else {
      res.status(404).send({ message: "Category not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}

const CategoryController = {
  getCategory,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategorySubcategory,
};

export default CategoryController;
