import { Request, Response, NextFunction } from "express";
import RateService from "../services/rate.service";

// Get all rates for a product
async function getRateByProductId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = Number(req.params.id);
    const rates = await RateService.getRateByProductId(productId);
    res.status(200).json(rates);
    return;
  } catch (err) {
    next(err);
  }
}

// Create a new rate
async function createRate(req: Request, res: Response, next: NextFunction) {
  try {
    const rate = await RateService.createRate({
      ...req.body,
      userId: req.user?.id,
      rating: Number(req.body.rating),
      productId: Number(req.params.id),
    });
    res.status(201).json(rate);
    return;
  } catch (err) {
    next(err);
  }
}

// Delete a rate by ID
async function deleteRate(req: Request, res: Response, next: NextFunction) {
  try {
    const rateId = Number(req.params.id);
    const deleted = await RateService.deleteRate(rateId, req.user?.id || 0);
    if (deleted) {
      res.status(204).send();
      return;
    } else {
      res.status(404).json({ message: "Rate not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}

// Update a rate by ID
async function updateRate(req: Request, res: Response, next: NextFunction) {
  try {
    const rateId = Number(req.params.id);
    const updated = await RateService.updateRate({
      ...req.body,
      userId: req.user?.id,
      productId: Number(req.params.id),
    });
    if (updated) {
      res.status(200).json(updated);
      return;
    } else {
      res.status(404).json({ message: "Rate not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}

const RateController = {
  getRateByProductId,
  createRate,
  deleteRate,
  updateRate,
};

export default RateController;
