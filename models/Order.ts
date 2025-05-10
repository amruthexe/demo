import mongoose, { Schema, model, models } from "mongoose";
import { ImageVariant, ImageVariantType } from "./Product";

interface PopulatedUser {
  _id: mongoose.Types.ObjectId;
  email: string;
}

interface PopulatedProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  imageUrl: string;
}

export interface IOrder {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | PopulatedUser;
  productId: mongoose.Types.ObjectId | PopulatedProduct;
  variant: ImageVariant;
  quantity: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  downloadUrl?: string;
  previewUrl?: string;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variant: {
      type: {
        type: String,
        required: true,
        enum: ["SQUARE", "WIDE", "PORTRAIT"] as ImageVariantType[],
        set: (v: string) => v.toUpperCase(),
      },
      price: { type: Number, required: true },
      license: {
        type: String,
        required: true,
        enum: ["personal", "commercial"],
      },
    },
    quantity: { type: Number, required: true, default: 1, min: 1 },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    downloadUrl: { type: String },
    previewUrl: { type: String },
    shippingAddress: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Order = models?.Order || model<IOrder>("Order", orderSchema);
export default Order;
