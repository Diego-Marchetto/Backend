import productModel from "../models/product.model.js";

class productManager {
    getProducts = async (req, res, query) => {
        try {
            const opts = {
                page: req.query.page || 1,
                limit: req.query.limit || 10,
                lean: true,
            };
            const sort = req.query.sort || null;
            const category = req.query.category;
            let categoryObj = category ? { name: category } : {};

            if (sort === "asc") {
                opts.sort = { price: 1 };
              }
            if (sort === "desc") {
                opts.sort = { price: -1 };
            }    

            const dats = await productModel.paginate(categoryObj, opts);
            const products = dats.docs;
            const hasPrevPage = dats.hasPrevPage;
            const hasNextPage = dats.hasNextPage; 
            const prevPage = dats.prevPage;
            const nextPage = dats.nextPage;
            const page = dats.page;
            return { products, hasNextPage, hasPrevPage, nextPage, prevPage, page };
        } catch (err) {
            throw new Error(err);
        }
    }
    getOneProduct = async (id) => {
        try {
            return await productModel.findById(id).lean();
        } catch (err) {
            throw new Error(err);
        }
    }
    createProduct = async (product) => {
        try {
            const newProduct = new productModel(product);
            return await productModel.create(newProduct);
        } catch (err) {
            throw new Error(err);
        }
    }
    updateProduct = async (id, newContent) => {
        try {
            return await productModel.findByIdAndUpdate(id, newContent, { new: true });
        }
        catch (err) {
            throw new Error(err);
        }
    }
    deleteProduct = async (id) => {
        try {
            return await productModel.findByIdAndDelete(id);
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

export default productManager;