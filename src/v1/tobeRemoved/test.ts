import ProductSchema from "../schemas/product.schema";

console.log(
  ProductSchema.createProductSchema
    .partial()
    .required({ id: true })
    .safeParse({ id: "adfas" }).error
);
