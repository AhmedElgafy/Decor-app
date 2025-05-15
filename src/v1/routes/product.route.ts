import { NextFunction, Request, Response, Router } from "express";
import ProductController from "../controllers/product.controller";
import isIdExistMW from "../middlewares/isIdExist";
import upload from "../config/multer.config";
import uploadImageMW from "../middlewares/uploadImage";
import ProductSchema from "../schemas/product.schema";

const router: Router = Router();
const path = "/product/:id";
router.get("/product", ProductController.getAllProducts);
router.use("/product", upload.single("image"));
router.use("/product", uploadImageMW);
router.post("/product", ProductController.createProduct);
// router.use(path, isIdExistMW);
router.get(path, ProductController.getProductById);
router.patch(path, ProductController.updateProduct);
router.delete(path, ProductController.deleteProductById);
export default router;
