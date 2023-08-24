import { connect } from "mongoose";
import env from "../config/enviroment.config.js";

export async function connectMongo() {
  try {
    await connect("mongodb+srv://zhelmomash:malmomento@cluster0.ezydc8x.mongodb.net/");
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
