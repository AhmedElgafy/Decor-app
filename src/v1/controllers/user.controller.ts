import { NextFunction, Request, Response } from "express";
import { UpdateUserSchema } from "../schemas/user.schema";
import { Cart, Prisma, Product, User } from "@prisma/client";
import UserService from "../services/user.service";
import { idSchema } from "../schemas/schema";
import {
  RateProducts,
  WishlistProduct,
  WishlistProducts,
} from "../../types/prisma";

async function getUser(req: Request, res: Response) {
  const user = await UserService.getUserById(Number(req.params.id));
  if (!user) {
    res.status(404).send({ message: "This user is not exist" });
    return;
  } else {
    res.status(200).send(user);
    return;
  }
}
async function getUsers(req: Request, res: Response) {
  const user = await UserService.getUsers();
  if (!user) {
    res.status(404).send({ message: "This user is not exist" });
    return;
  } else {
    res.status(200).send(user);
    return;
  }
}
async function updateUser(
  req: Request<{ id: string }, {}, User>,
  res: Response,
  next: NextFunction
) {
  try {
    UpdateUserSchema.parse(req.body);
    const newUser = await UserService.updateUser(req);
    res.status(200).send({ message: "User is updated successfully", newUser });
    return;
  } catch (err) {
    next(err);
  }
}
async function getUserCart(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    console.log({ id });
    idSchema.parse({ id });
    const cart: Cart | null = await UserService.getUserCart(id);
    if (!cart) {
      res.status(404).send({ message: "This cart is not exist" });
      return;
    } else {
      res.status(200).send(cart);
      return;
    }
  } catch (err) {
    next(err);
  }
}
async function getUserRate(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    console.log({ id });
    idSchema.parse({ id });
    const rate: RateProducts[] | null = await UserService.getUserRate(id);
    res.status(200).send(rate || []);
    return;
  } catch (err) {
    next(err);
  }
}
async function getUserOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    console.log({ id });
    idSchema.parse({ id });
    const orders = await UserService.getUserOrders(id);
    res.status(200).send(orders || []);
    return;
  } catch (err) {
    next(err);
  }
}
async function getUserWishlist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    console.log({ id });
    idSchema.parse({ id });
    const wishlist: WishlistProduct[] | null =
      await UserService.getUserWishlist(id);
    res.status(200).send(wishlist || []);
  } catch (err) {
    next(err);
  }
}
async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id: number = Number(req.params.id);
    const user = await UserService.deleteUser(id);
    if (!user) {
      res.status(404).send({ message: "User is is not found" });
      return;
    } else {
      res.status(204).send({ message: "User is deleted successfully" });
      return;
    }
  } catch (err) {
    next(err);
  }
}
const UserController = {
  updateUser,
  getUser,
  deleteUser,
  getUsers,
  getUserCart,
  getUserRate,
  getUserWishlist,
  getUserOrder,
};
export default UserController;
