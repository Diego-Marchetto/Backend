import { userMongoose } from "./mongoose/users.mongoose.js";
import { isValidPassword } from "../../utils/hashPassword.js";

class UserModel {
  async getAll() {
    try {
      const user = await userMongoose.find(
        {},
        {
          __v: false,
        }
      );
      return user;
    } catch (e) {
      throw e;
    }
  }
  async getOne(username) {
    const user = await userMongoose.findOne({ username: username }, {});
    return user;
  }
  async getUserById(id) {
    const user = await userMongoose.findById({ _id: id });
    return user;
  }
  async create({ first_name, last_name, username, email, age, password, cid }) {
    const userCreated = await userMongoose.create({
      first_name,
      last_name,
      username,
      email,
      age,
      password,
      cid,
    });
    return userCreated;
  }
  async delete(id) {
    const result = await userMongoose.deleteOne({ _id: id });
    return result;
  }
  async update(id, firstName, lastName, email) {
    const userUptaded = await userMongoose.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return userUptaded;
  }

  async auth(username, password) {
    try {
      const user = await userMongoose.findOne({
        username: username,
      });
      if (user && isValidPassword(password, user.password)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  }
}
export const userModel = new UserModel();
