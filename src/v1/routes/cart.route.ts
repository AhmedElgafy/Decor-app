import { Router } from "express";
import isIdExistMW from "../middlewares/isIdExist";
import CartController from "../controllers/cart.controller";
const router: Router = Router();
const pathById = "/cart/:id";
const pathByProductId = "/cart/:id/product/:productId";
const path = "/cart";
router.get(path, CartController.getCartByUserId);
// Validate the ID
router.use(pathByProductId, isIdExistMW);
router.get(pathById, CartController.getCartByCartId);
router.delete(pathByProductId, CartController.deleteProductCart);
router.post(pathByProductId, CartController.addProductToCart);
router.patch(pathByProductId, CartController.updateCart);
export default router;
