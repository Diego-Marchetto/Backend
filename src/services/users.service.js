import { userModel } from "../dao/models/users.model.js";

class userServices {
  async getAll() {
    const users = await userModel.getAll();

    return users;
  }

  async getOne(username) {
    const user = await userModel.getOne(username);
    return user;
  }
  async getUserById(id) {
    const user = userModel.getUserById(id);
    return user;
  }

  async create({ first_name, last_name, username, email, age, password, cid }) {
    const userCreated = await userModel.create({
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
    const result = await userModel.delete(id);
    return result;
  }
  async update(id, firstName, lastName, email) {
    const userUptaded = await userModel.update(id, firstName, lastName, email);
    return userUptaded;
  }

  async auth(email, password) {
    try {
      const user = await userModel.auth(email, password);

      return user;
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  }
}
export const UServices = new userServices();
