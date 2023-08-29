import { Schema, model } from "mongoose";

const ticketsSchema = new Schema({
  code: { type: String, maxlength: 100 },
  purchase_datetime: { type: String, maxlength: 100 },
  amount: { type: Number, maxlength: 100 },
  purchaser: { type: String, maxlength: 100 },
});

export const ticketsMongoose = model("tickets", ticketsSchema);
