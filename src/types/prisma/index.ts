import { Order, OrderItem, Product, Rate, Wishlist, WishlistItem } from "@prisma/client";

export interface WishlistProduct extends WishlistItem {
  product: Product;
}
export interface WishlistProducts extends Wishlist {
  WishlistItem: WishlistProduct[];
}
export interface RateProducts extends Rate {
  product: Product;
}
export interface OrderProduct extends Order {
  orderItems: (OrderItem & { product: Product })[];
}
