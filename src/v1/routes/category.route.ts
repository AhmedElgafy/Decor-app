import { Router } from "express";
import isIdExistMW from "../middlewares/isIdExist";
import upload from "../config/multer.config";
import uploadImageMW from "../middlewares/uploadImage";
import CategoryController from "../controllers/category.controller";

const router: Router = Router();

const pathById = "/category/:id";
const categoryProductsByIdPath = "/category/:id/subcategory";
const path = "/category";

router.get(path, CategoryController.getAllCategories);
router.use(path, upload.single("image"));
router.use(path, uploadImageMW);
router.post(path, CategoryController.createCategory);

// Validate ID
router.use(pathById, uploadImageMW);
router.use(pathById, isIdExistMW);
router.get(pathById, CategoryController.getCategory);
router.get(categoryProductsByIdPath, CategoryController.getCategorySubcategory);
router.patch(pathById, CategoryController.updateCategory);
router.delete(pathById, CategoryController.deleteCategory);

export default router;
