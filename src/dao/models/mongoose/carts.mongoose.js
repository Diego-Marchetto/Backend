//@ts-check
import { Schema, model } from "mongoose";

const prodCartSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const cartsSchema = new Schema({
  products: { type: [prodCartSchema], required: true },
});

export const cartMongoose = model("carts", cartsSchema);
