import { Request, Response, NextFunction } from "express";
import { Wishlist, WishlistItem } from "@prisma/client";
import WishlistService from "../services/whishlist.service";

// Get a single wishlist by user ID
async function getWishlistByUserId(req: Request, res: Response) {
  const id = Number(req.user?.id);
  const wishlist = await WishlistService.getWishlistByUserId(id);
  if (wishlist) {
    res.status(200).send(wishlist);
    return;
  } else {
    res.status(404).send({ message: "Wishlist not found" });
    return;
  }
}

async function getWishlistByWishlistId(req: Request, res: Response) {
  const id = Number(req.params?.id);
  const wishlist = await WishlistService.getWishlistByUserId(id);
  if (wishlist) {
    res.status(200).send(wishlist);
    return;
  } else {
    res.status(404).send({ message: "Wishlist not found" });
    return;
  }
}

// Create a new wishlist
async function createWishlist(
  req: Request<{}, {}, Wishlist>,
  res: Response,
  next: NextFunction
) {
  try {
    const wishlist = await WishlistService.createWishlist(req.body.userId);
    res.status(201).send(wishlist);
    return;
  } catch (err) {
    next(err);
  }
}

// Delete a wishlist item by ID
async function deleteProductWishlist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const productId = Number(req.params.productId);
    const wishlistItem = await WishlistService.deleteProductFromWishlist(
      id,
      productId
    );
    if (wishlistItem) {
      res.status(204).send({ message: "Wishlist item deleted successfully" });
      return;
    } else {
      res.status(404).send({ message: "Wishlist item not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}

async function addProductToWishlist(
  req: Request<{ id: number; productId: number }, {}, WishlistItem>,
  res: Response,
  next: NextFunction
) {
  try {
    const wishlistId = Number(req.params.id);
    const wishlistItem = await WishlistService.addProductToWishlist(
      wishlistId,
      Number(req.params.productId)
    );
    if (wishlistItem) {
      res.status(201).send(wishlistItem);
      return;
    } else {
      res.status(404).send({ message: "Wishlist not found" });
      return;
    }
  } catch (err) {
    next(err);
  }
}

const WishlistController = {
  getWishlistByUserId,
  createWishlist,
  deleteProductWishlist,
  getWishlistByWishlistId,
  addProductToWishlist,
};

export default WishlistController;
