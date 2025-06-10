import { Order, OrderItem, Product } from "@prisma/client";
import prisma from "../config/db";
import { idSchema } from "../schemas/schema";
import { orderItemSchema } from "../schemas/orderItem.schema";

async function createOrder(userId: number | null): Promise<Order | null> {
  if (!userId) return null;
  const order = await prisma.order.create({
    data: { userId: userId },
  });
  return order;
}
async function createOrderByCartId(cartId: number): Promise<Product[] | null> {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { cartItems: { include: { product: true } } },
  });
  const products: Product[] = [];
  const order = await createOrder(cart?.userId || null);
  for (const cartItem of cart?.cartItems || []) {
    try {
      const orderItem = await addProductToOrder(
        order?.id || 0,
        cartItem.productId,
        cartItem.quantity
      );
      if (orderItem) {
        const product = await prisma.product.findUnique({
          where: { id: cartItem.productId },
        });
        if (product) {
          products.push(product);
        }
      }
    } catch (e) {
      continue;
    }
  }
  return products;
}

async function getOrdersByUserId(userId: number): Promise<Order[] | null> {
  const orders = await prisma.order.findMany({
    where: { userId: userId },
    include: { orderItems: { include: { product: true } } },
  });
  return orders;
}

async function addProductToOrder(
  orderId: number,
  productId: number,
  quantity: number
): Promise<OrderItem | null> {
  const validOrderItem = orderItemSchema
    .partial()
    .required({ productId: true, orderId: true, quantity: true })
    .parse({ productId, orderId, quantity });
  const orderItem = await prisma.$transaction(async (trx) => {
    // const [product] = await trx.$queryRawUnsafe<any[]>(
    //   `SELECT * FROM Product WHERE id = ? FOR UPDATE`,
    //   productId
    // );
    const orderItem = await trx.orderItem.create({
      data: {
        orderId: validOrderItem.orderId,
        productId: validOrderItem.productId,
        quantity: validOrderItem.quantity,
      },
    });
    if (!orderItem) {
      return orderItem;
    }
    const product = await trx.product.findUnique({ where: { id: productId } });
    console.log(
      "Product in stock:",
      (product?.inStock || 0) < validOrderItem.quantity
    );
    if ((product?.inStock || 0) < validOrderItem.quantity) {
      throw new Error("Not enough stock for the product");
    }
    if (product) {
      await trx.product.update({
        where: { id: productId },
        data: { inStock: product.inStock - validOrderItem.quantity },
      });
    }
    return orderItem;
  });

  return orderItem;
}

async function deleteProductFromOrder(
  orderId: number,
  productId: number
): Promise<OrderItem | null> {
  const validProductId = idSchema.parse({ id: productId });
  const orderItem = await prisma.orderItem.delete({
    where: {
      orderId_productId: { orderId: orderId, productId: validProductId.id },
    },
  });
  return orderItem;
}

async function updateOrderItem(
  updatedOrderItem: Omit<OrderItem, "id">
): Promise<Omit<OrderItem, "id"> | null> {
  const validOrderItem = orderItemSchema
    .partial({ id: true })
    .parse(updatedOrderItem);
  const orderItem = await prisma.orderItem.update({
    where: {
      orderId_productId: {
        productId: validOrderItem.productId,
        orderId: validOrderItem.orderId,
      },
    },
    data: validOrderItem,
  });
  return orderItem;
}

const OrderService = {
  createOrder,
  getOrdersByUserId,
  addProductToOrder,
  deleteProductFromOrder,
  updateOrderItem,
  createOrderByCartId,
};

export default OrderService;
