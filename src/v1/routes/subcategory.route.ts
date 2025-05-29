import { Router } from "express";
// import SubCategoryController from "../controllers/subcategory.controller";
import isIdExistMW from "../middlewares/isIdExist";
import upload from "../config/multer.config";
import uploadImageMW from "../middlewares/uploadImage";
import SubCategoryController from "../controllers/subcategory.controller";

const router: Router = Router();

const pathById = "/subcategory/:id";
const subcategoryProductsByIdPath = "/subcategory/:id/product";
const path = "/subcategory";

router.get(path, SubCategoryController.getAllSubCategories);
router.use(path, upload.single("image"));
router.use(path, uploadImageMW);
router.post(path, SubCategoryController.createSubCategory);

/// Validate ID
router.use(pathById, uploadImageMW);
router.use(pathById, isIdExistMW);
router.patch(pathById, SubCategoryController.updateSubCategory);
router.get(pathById, SubCategoryController.getSubCategory);
router.get(
  subcategoryProductsByIdPath,
  SubCategoryController.getSubcategoryProducts
);
router.delete(pathById, SubCategoryController.deleteSubCategory);

export default router;
