import { Wishlist, WishlistItem } from "@prisma/client";
import prisma from "../config/db";
import { idSchema } from "../schemas/schema";
import { wishlistItemSchema } from "../schemas/wishlistItem.schema";

async function createWishlist(userId: number): Promise<Wishlist | null> {
  const wishlist = await prisma.wishlist.create({
    data: { userId: userId },
  });
  return wishlist;
}

async function getWishlistByUserId(userId: number): Promise<Wishlist | null> {
  const wishlist = await prisma.wishlist.findUnique({
    where: { userId: userId },
    include: { WishlistItem: { include: { product: true } } },
  });
  return wishlist;
}

async function addProductToWishlist(
  wishlistId: number,
  productId: number
): Promise<WishlistItem | null> {
  const validWishlistItem = wishlistItemSchema
    .partial()
    .required({ productId: true, wishlistId: true })
    .parse({ productId, wishlistId });
  const wishlistItem = await prisma.wishlistItem.create({
    data: {
      wishlistId: validWishlistItem.wishlistId,
      productId: validWishlistItem.productId,
    },
  });
  return wishlistItem;
}

async function deleteProductFromWishlist(
  wishlistId: number,
  productId: number
): Promise<WishlistItem | null> {
  const validProductId = idSchema.parse({ id: productId });
  const wishlistItem = await prisma.wishlistItem.delete({
    where: {
      productId_wishlistId: {
        wishlistId: wishlistId,
        productId: validProductId.id,
      },
    },
  });
  return wishlistItem;
}

const WishlistService = {
  createWishlist,
  getWishlistByUserId,
  addProductToWishlist,
  deleteProductFromWishlist,
};

export default WishlistService;
