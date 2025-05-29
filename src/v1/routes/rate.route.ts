import { Router } from "express";
import RateController from "../controllers/rate.controller";
import isIdExistMW from "../middlewares/isIdExist";

const router = Router();
const productRateId = "/product/:id/rate";
router.use(productRateId, isIdExistMW);
// Get all rates for a product
router.get(productRateId, RateController.getRateByProductId);

// Create a new rate
router.post(productRateId, RateController.createRate);

// Delete a rate by ID
router.patch(productRateId, RateController.updateRate);

// Update a rate by ID
router.use("/rate/:id", isIdExistMW);
router.delete("/rate/:id", RateController.deleteRate);

export default router;
