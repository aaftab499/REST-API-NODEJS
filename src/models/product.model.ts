import { Schema, Document, model } from "mongoose";
import { UserDocument } from "./user.model";
import { v4 as uuidv4 } from 'uuid';


export interface ProductInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductDocument extends ProductInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${uuidv4()}`,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<ProductDocument>("Product", productSchema);

export default ProductModel;