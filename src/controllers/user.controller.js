import userModel from "../dao/mongo/models/user.model.js";
import { isValidPassword } from "../utils/hashPassword.js";

class userServices {
  async getAll() {
    const users = await userModel.find(
      {},
      {
        _id: true,
        firstName: true,
        lastName: true,
        email: true,
      }
    );
    return users;
  }
  async getOne(username) {
    const users = await userModel.findOne(
      { username: username },
      { password: true }
    );
    return users;
  }
  async auth(username, password) {
    try {
      const user = await userModel.findOne({
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

  async create({ first_name, last_name, username, email, age, password }) {
    const userCreated = await userModel.create({
      first_name,
      last_name,
      username,
      email,
      age,
      password,
    });
    return userCreated;
  }

  async delete(id) {
    const result = await userModel.deleteOne({ _id: id });
    return result;
  }
  async update(id, firstName, lastName, email) {
    const userUptaded = await userModel.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return userUptaded;
  }
}
export const UServices = new userServices();