import { Request, Response, NextFunction } from "express";
import { Order, OrderItem } from "@prisma/client";
import OrderService from "../services/order.service";

// Get all orders by user ID
async function getOrdersByUserId(req: Request, res: Response) {
  const id = Number(req.user?.id);
  const orders = await OrderService.getOrdersByUserId(id);
  if (orders) {
    res.status(200).send(orders);
    return;
  } else {
    res.status(404).send({ message: "Orders not found" });
    return;
  }
}

// Create a new order
async function createOrder(
  req: Request<{}, {}, Order>,
  res: Response,
  next: NextFunction
) {
  try {
    const order = await OrderService.createOrder(req.user?.id || null);
    res.status(201).send(order);
    return;
  } catch (err) {
    next(err);
  }
}

// Update an order item
async function updateOrder(
  req: Request<{ id: number; productId: number }, {}, OrderItem>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = {
      orderId: Number(req.params.id),
      productId: Number(req.params.productId),
      quantity: Number(req.body.quantity),
    };
    const orderItem = await OrderService.updateOrderItem(body);
    if (orderItem) {
      res.status(200).send(orderItem);
      return;
    } else {
      res.status(404).send({ message: "Order item not found" });
      return;
    }
  } catch (err) {
    const error = err as Error & { code?: string };
    if (error?.code === "P2025") {
      res.status(404).send({ message: "Order item not found" });
      return;
    }
    next(err);
  }
}

// Delete a product from an order
async function deleteProductOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const productId = Number(req.params.productId);
    const orderItem = await OrderService.deleteProductFromOrder(id, productId);
    if (orderItem) {
      res.status(204).send({ message: "Order item deleted successfully" });
      return;
    } else {
      res.status(404).send({ message: "Order item not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}

// Add a product to an order
async function addProductToOrder(
  req: Request<{ id: number; productId: number }, {}, OrderItem>,
  res: Response,
  next: NextFunction
) {
  try {
    const orderId = Number(req.params.id);
    const orderItem = await OrderService.addProductToOrder(
      orderId,
      Number(req.params.productId),
      Number(req.body?.quantity)
    );
    if (orderItem) {
      res.status(201).send(orderItem);
      return;
    } else {
      res.status(404).send({ message: "Order not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}

const OrderController = {
  getOrdersByUserId,
  createOrder,
  updateOrder,
  deleteProductOrder,
  addProductToOrder,
};

export default OrderController;
