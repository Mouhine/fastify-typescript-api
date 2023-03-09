import { Document, Schema, model, Types } from "mongoose";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklamnopqrstwz0123456789", 10);

export interface ProductDocument extends Document {
  user: Types.ObjectId;
  title: String;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = model("Produc", productSchema);

export default Product;
