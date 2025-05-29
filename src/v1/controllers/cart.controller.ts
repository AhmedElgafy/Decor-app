import { error } from "console";
import { Request, Response, NextFunction } from "express";
import { Cart, CartItem } from "@prisma/client";
import CartService from "../services/cart.service";
import { idSchema } from "../schemas/schema";

// Get a single cart by ID
async function getCartByUserId(req: Request, res: Response) {
  const id = Number(req.user?.id);
  const cart = await CartService.getCartByUserId(id);
  if (cart) {
    res.status(200).send(cart);
    return;
  } else {
    res.status(404).send({ message: "Cart not found" });
    return;
  }
}

async function getCartByCartId(req: Request, res: Response) {
  const id = Number(req.params?.id);
  const cart = await CartService.getCartByUserId(id);
  if (cart) {
    res.status(200).send(cart);
    return;
  } else {
    res.status(404).send({ message: "Cart not found" });
    return;
  }
}
// Create a new cart
async function createCart(
  req: Request<{}, {}, Cart>,
  res: Response,
  next: NextFunction
) {
  try {
    const cart = await CartService.createCart(req.body.userId);
    res.status(201).send(cart);
    return;
  } catch (err) {
    next(err);
  }
}

// Update a cart by ID
async function updateCart(
  req: Request<{ id: number; productId: number }, {}, CartItem>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = {
      id: Number(1),
      cartId: Number(req.params.id),
      productId: Number(req.params.productId),
      quantity: Number(req.body.quantity),
    };
    const cart = await CartService.updateCartItem(body);
    if (cart) {
      res.status(200).send(cart);
      return;
    } else {
      res.status(404).send({ message: "Cart not found" });
      return;
    }
  } catch (err) {
    const error = (err as Error&{ code?: string }) 
    if (error?.code === "P2025") {
      res.status(404).send({ message: "Cart item not found" });
      return;
    }
    next(err);
  }
}

// Delete a cart by ID
async function deleteProductCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const productId = Number(req.params.productId);
    const cart = await CartService.deleteProductFromCart(id, productId);
    if (cart) {
      res.status(204).send({ message: "Cart deleted successfully" });
      return;
    } else {
      res.status(404).send({ message: "Cart not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}
async function addProductToCart(
  req: Request<{ id: number; productId: number }, {}, CartItem>,
  res: Response,
  next: NextFunction
) {
  try {
    const cartId = Number(req.params.id);
    const cartItem = await CartService.addProductToCart(
      cartId,
      Number(req.params.productId),
      Number(req.body?.quantity)
    );
    if (cartItem) {
      res.status(201).send(cartItem);
      return;
    } else {
      res.status(404).send({ message: "Cart not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}

const CartController = {
  getCartByUserId,
  createCart,
  updateCart,
  deleteProductCart,
  getCartByCartId,
  addProductToCart,
};

export default CartController;
