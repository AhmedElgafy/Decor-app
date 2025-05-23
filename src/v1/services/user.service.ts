import { Cart, Rate, User, Wishlist, WishlistItem } from "@prisma/client";
// services/user.service.ts
import { Request } from "express";
import prisma from "../config/db";
import { LoginType, UserType } from "../schemas/user.schema";
import { createUserToken } from "../utils/auth";
import { deleteFile, uploadFile } from "./cloudinary.service";
import {
  OrderProduct,
  RateProducts,
  WishlistProduct,
  WishlistProducts,
} from "../../types/prisma";

async function loginUserService(data: LoginType) {
  const user = await prisma.user.findFirst({
    where: {
      AND: [{ email: data.email }, { password: data.password }],
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      birthDate: true,
      gender: true,
      image: true,
    },
  });

  if (!user) {
    return null;
  }

  const token = createUserToken(user);

  return { user, token };
}
async function createUserService(user: UserType) {
  const userNew = await prisma.user.create({ data: user });
  return userNew;
}
async function getUserById(id: number | undefined) {
  return await prisma.user.findUnique({
    where: { id: id },
    omit: { password: true },
  });
}
async function getUsers() {
  return await prisma.user.findMany({ omit: { password: true } });
}
async function deleteUser(id: number) {
  const user: User = await prisma.user.delete({ where: { id: id } });
  return user;
}
async function updateUser(req: Request<{ id: string }, {}, User>) {
  const id = Number(req.params.id);
  let oldImage: string | null = null;
  let newImage: string | null = null;
  if (req.file) {
    const user = await prisma.user.findUnique({ where: { id: id } });
    newImage = await uploadFile(req.file);
    oldImage = user?.image || null;
  }
  if (newImage && oldImage && oldImage != process.env.DEFAULT_USER_IMAGE) {
    await deleteFile(oldImage);
  }
  const newUser: any = await prisma.user.update({
    where: { id: id },
    data: { ...req.body, ...(newImage && { image: newImage }) },
  });
  delete newUser.password;
  return newUser;
}

async function deleteUserService(user: User) {
  await prisma.user.delete({ where: { id: user.id } });
}
interface UserCart extends User {
  cart: Cart | null;
}
async function getUserCart(id: number): Promise<Cart | null> {
  const user: UserCart | null = await prisma.user.findUnique({
    where: { id: id },
    include: {
      cart: {
        include: {
          cartItems: { include: { product: true }, omit: { cartId: true } },
        },
      },
    },
  });
  return user?.cart || null;
}

async function getUserWishlist(id: number): Promise<WishlistProduct[] | null> {
  const wishlist: WishlistProducts | null = await prisma.wishlist.findUnique({
    where: { userId: id },
    include: {
      WishlistItem: { include: { product: true } },
    },
  });
  return wishlist?.WishlistItem || null;
}

async function getUserRate(id: number): Promise<RateProducts[] | null> {
  const rate: RateProducts[] | null = await prisma.rate.findMany({
    where: { userId: id },
    include: { product: true },
  });
  return rate || null;
}
async function getUserOrders(id: number): Promise<OrderProduct[] | null> {
  const rate: OrderProduct[] = await prisma.order.findMany({
    where: { userId: id },
    include: {
      orderItems: { include: { product: true } },
    },
  });
  return rate || null;
}
const UserService = {
  loginUserService,
  createUserService,
  getUserById,
  getUsers,
  updateUser,
  deleteUserService,
  getUserCart,
  getUserWishlist,
  deleteUser,
  getUserRate,
  getUserOrders,
};
export default UserService;
