import { Order, OrderItem } from "@prisma/client";
import prisma from "../config/db";
import { idSchema } from "../schemas/schema";
import { orderItemSchema } from "../schemas/orderItem.schema";

async function createOrder(userId: number|null): Promise<Order | null> {
  if(!userId)return null
  const order = await prisma.order.create({
    data: { userId: userId },
  });
  return order;
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
  const orderItem = await prisma.orderItem.create({
    data: {
      orderId: validOrderItem.orderId,
      productId: validOrderItem.productId,
      quantity: validOrderItem.quantity,
    },
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
  updatedOrderItem: Omit<OrderItem,"id">
): Promise<Omit<OrderItem,"id"> | null> {
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
};

export default OrderService;
