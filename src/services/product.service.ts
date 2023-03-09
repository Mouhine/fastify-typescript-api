import { FilterQuery, QueryOptions, Types, UpdateQuery } from "mongoose";
import Product, { ProductDocument } from "../models/product.model";
interface ProductBody {
  user: Types.ObjectId;
  title: String;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
export async function createProduct(
  input: Omit<ProductBody, "createdAt" | "updatedAt">
) {
  return Product.create(input);
}
export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return Product.findOne(query, {}, options);
}
export async function updateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return Product.findOneAndUpdate(query, update, options);
}
export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return Product.deleteOne(query);
}
