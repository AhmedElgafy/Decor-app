import { Request, Response, NextFunction } from "express";
import { SubCategory } from "@prisma/client";
import SubCategoryService from "../services/subcategory.service";

// Get a single subcategory by ID
async function getSubCategory(req: Request, res: Response) {
  const id = Number(req.params.id);
  const subcategory = await SubCategoryService.getSubCategoryById(id);
  if (subcategory) {
    res.status(200).send(subcategory);
    return;
  } else {
    res.status(404).send({ message: "Subcategory not found" });
    return;
  }
}

// Get all subcategories
async function getAllSubCategories(req: Request, res: Response) {
  const subcategories = await SubCategoryService.getAllSubCategories();
  res.status(200).send(subcategories);
}

// Create a new subcategory
async function createSubCategory(
  req: Request<{}, {}, SubCategory>,
  res: Response,
  next: NextFunction
) {
  try {
    const subcategory = await SubCategoryService.createSubCategory(req.body);
    res.status(201).send(subcategory);
    return;
  } catch (err) {
    next(err);
  }
}

// Update a subcategory by ID
async function updateSubCategory(
  req: Request<{ id: number }, {}, SubCategory>,
  res: Response,
  next: NextFunction
) {
  try {
    const subcategory = await SubCategoryService.updateSubCategoryById({
      ...req.body,
      id: Number(req.params.id),
    });
    if (subcategory) {
      res.status(200).send(subcategory);
      return;
    } else {
      res.status(404).send({ message: "Subcategory not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}

// Delete a subcategory by ID
async function deleteSubCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const subcategory = await SubCategoryService.deleteSubCategoryById(id);
    if (subcategory) {
      res.status(204).send({ message: "Subcategory deleted successfully" });
      return;
    } else {
      res.status(404).send({ message: "Subcategory not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}
// Get products of a subcategory by ID
async function getSubcategoryProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const subcategoryProducts = await SubCategoryService.getSubcategoryProducts(
      id
    );
    if (subcategoryProducts) {
      res.status(200).send(subcategoryProducts);
      return;
    } else {
      res.status(404).send({ message: "Subcategory not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}

const SubCategoryController = {
  getSubCategory,
  getAllSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubcategoryProducts,
};

export default SubCategoryController;
