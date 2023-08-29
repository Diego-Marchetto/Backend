import importModels from "../dao/factory.js";

const models = await importModels();
const productModel = models.products;

class productServices {
  async getAll(queryParams) {
    const response = await productModel.getAll(queryParams);
    return response;
  }

  async getProductById(pid) {
    const producById = await productModel.getProductById(pid);

    return producById;
  }
  async getProductRealTime() {
    const products = await productModel.getProductRealTime();

    return products;
  }

  async createProduct(product) {
    const productCreated = await productModel.createProduct(product);
    return productCreated;
  }
  async updateProduct({
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  }) {
    const userUptaded = await productModel.updateProduct({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    });
    return userUptaded;
  }
  async deleteProduct(id) {
    const result = await productModel.deleteProduct(id);
    return result;
  }
}
export const PServices = new productServices();
