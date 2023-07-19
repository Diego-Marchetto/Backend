import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  last_name: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    maxlength: 100,
  },
  age: {
    type: Number,
    trim: true,
    maxlength: 100,
  },
  password: {
    type: String,
    maxlength: 100,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  cid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
    required: true,
  },
});

const userModel = mongoose.model(usersCollection, userSchema);
export default userModel;