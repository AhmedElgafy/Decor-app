import {
  Order,
  OrderItem,
  Product,
  Rate,
  User,
  Wishlist,
  WishlistItem,
} from "@prisma/client";

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
export interface ProductRate {
  rates: (Rate & { user: { name: string; image: string } })[];
}
export interface SubCategoryProducts {
  products: Product[];
}
export interface Paginated<T>{
  results:T[]
  totalCount:number,
  nextPage:string | null,
  previousPage:string | null
}