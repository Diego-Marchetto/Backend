import cartModel from '../dao/mongo/models/cart.model.js'

class cartManager {
    getCarts = async (req, res, query) => {
        try {
            const opts = {
                page: req.query.page || 1,
                limit: req.query.limit || 10,
                lean: true
            };

            const dats = await cartModel.paginate({}, opts);
            const carts = dats.docs;
            const hasPrevPage = dats.hasPrevPage;
            const hasNextPage = dats.hasNextPage;
            const prevPage = dats.prevPage;
            const nextPage = dats.nextPage;
            return { carts, hasNextPage, hasPrevPage, nextPage, prevPage };
        } catch (err) {
            throw new Error(err);
        }
    }
    getOneCart = async (id) => {
        try {
            return await cartModel.findById(id).populate('items.productId').lean();
        } catch (err) {
            throw new Error(err);
        }
    }
    createCart = async (cart) => {
        try {
            const newCart = new cartModel(cart);
            return await newCart.save();
        } catch (err) {
            throw new Error(err);
        }
    }

    addToCart = async (cartId, productId) => {
        try {
            const cart = await cartModel.findById(cartId);

            const existingItem = cart.items.find(item => item.productId.toString() === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
            await cart.save();

            console.log('Agregado al carrito con exito');
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    }

    removeFromCart = async (cartId, productId) => {
        try {
            const cart = await cartModel.findById(cartId);
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex !== -1) {
                cart.items.splice(itemIndex, 1);

                await cart.save();

                console.log('Producto eliminado del carrito');
            } else {
                console.log('El producto no existe en el carrito');
            }
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
        }
    }

    clearCart = async (cartId) => {
        try {

            const cart = await cartModel.findById(cartId);
            cart.items = [];
            await cart.save();

            console.log('Carrito vaciado');
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
        }
    }
    deleteCart = async (id) => {
        try {
            return await cartModel.findByIdAndDelete(id);
        } catch (err) {
            throw new Error(err);
        }
    }
}
export default cartManager
