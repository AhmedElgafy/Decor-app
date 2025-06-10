import { Router } from "express";
import isIdExistMW from "../middlewares/isIdExist";
import OrderController from "../controllers/order.controller";

const router: Router = Router();
const pathByProductId = "/order/:id/product/:productId";
const pathByCartId = "/order/cart/:id";
const path = "/order";

router.get(path, OrderController.getOrdersByUserId);
// Validate the ID
router.use(pathByCartId, isIdExistMW);
router.post(pathByCartId, OrderController.createOrderByCartId);
// router.use(pathByProductId, isIdExistMW);
// router.delete(pathByProductId, OrderController.deleteProductOrder);
// router.post(pathByProductId, OrderController.addProductToOrder);
// router.patch(pathByProductId, OrderController.updateOrder);
// router.post(path, OrderController.createOrder);

export default router;
