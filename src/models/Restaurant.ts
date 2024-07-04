import mongoose, { Schema, Document } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  description?: string;
  price: number;
}

export interface IRestaurant extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  address: string;
  cuisine: string;
  rating: number;
  menu: IMenuItem[];
}

const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, default: 0 },
  menu: [MenuItemSchema],
});

export default mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
