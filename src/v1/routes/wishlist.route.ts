import { Router } from "express";
import isIdExistMW from "../middlewares/isIdExist";
import WishlistController from "../controllers/wishlist.controller";

const router: Router = Router();
const pathById = "/wishlist/:id";
const pathByProductId = "/wishlist/:id/product/:productId";
const path = "/wishlist";

router.get(path, WishlistController.getWishlistByUserId);

// Validate the ID
router.use(pathByProductId, isIdExistMW);
router.get(pathById, WishlistController.getWishlistByWishlistId);
router.delete(pathByProductId, WishlistController.deleteProductWishlist);
router.post(pathByProductId, WishlistController.addProductToWishlist);

export default router;
