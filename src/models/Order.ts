import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";
import { IRestaurant } from "./Restaurant";

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  user: IUser["_id"];
  restaurant: IRestaurant["_id"];
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: "pending" | "preparing" | "delivering" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "preparing", "delivering", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IOrder>("Order", OrderSchema);
