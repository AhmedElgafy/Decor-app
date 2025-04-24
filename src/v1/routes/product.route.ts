import { Router } from "express";
import ProductController from "../controllers/product.controller";
import isIdExistMW from "../middlewares/isIdExist";
import upload from "../config/multer.config";
import uploadImageMW from "../middlewares/uploadImage";

const router: Router = Router();
const path = "/product/:id";
router.use(path, upload.single("image"));
router.use(uploadImageMW);
router.post("/product", ProductController.createProduct);
router.use(path, isIdExistMW);
router.get(path, ProductController.getProductById);
router.patch(path, ProductController.updateProduct);
router.delete(path, ProductController.deleteProductById);
export default router;
