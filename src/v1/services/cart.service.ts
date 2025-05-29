import { Cart, CartItem } from "@prisma/client";
import prisma from "../config/db";
import { cartItemSchema } from "../schemas/cartItem.schema";
import { idSchema } from "../schemas/schema";

async function createCart(userId: number): Promise<Cart | null> {
  const cart = await prisma.cart.create({
    data: { userId: userId, total: 0, count: 0 },
  });
  return cart;
}
async function getCartByUserId(userId: number): Promise<Cart | null> {
  const cart = await prisma.cart.findUnique({
    where: { userId: userId },
    include: { cartItems: { include: { product: true } } },
  });
  return cart;
}
async function addProductToCart(
  cartId: number,
  productId: number,
  quantity: number
): Promise<CartItem | null> {
  const validCartItem = cartItemSchema
    .partial()
    .required({ productId: true, cartId: true, quantity: true })
    .parse({ productId, cartId, quantity });
  const cart = await prisma.cartItem.create({
    data: {
      cartId: validCartItem.cartId,
      productId: validCartItem.productId,
      quantity: validCartItem.quantity,
    },
  });
  return cart;
}
async function deleteProductFromCart(
  cartId: number,
  productId: number
): Promise<CartItem | null> {
  const validProductId = idSchema.parse({ id: productId });
  const cart = await prisma.cartItem.delete({
    where: {
      cartId_productId: { cartId: cartId, productId: validProductId.id },
    },
  });
  return cart;
}
async function updateCartItem(
  updatedCartItem: CartItem
): Promise<CartItem | null> {
  const validCartItem = cartItemSchema
    .partial({ id: true })
    .parse(updatedCartItem);
  const cart = await prisma.cartItem.update({
    where: {
      cartId_productId: {
        productId: validCartItem.productId,
        cartId: validCartItem.cartId,
      },
    },
    data: validCartItem,
  });
  return cart;
}
const CartService = {
  createCart,
  getCartByUserId,
  addProductToCart,
  deleteProductFromCart,
  updateCartItem,
};
export default CartService;
