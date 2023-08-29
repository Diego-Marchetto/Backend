import { Server } from "socket.io";
//import { MessageModel } from "../DAO/models/messages.model.js";
import { PServices } from "../services/products.service.js";
export function connectSocketServer(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", (socket) => {
    socket.on("msg_front_to_back", async (msg) => {
      try {
        await MessageModel.create(msg);
      } catch (e) {
        console.log(e);
      }

      try {
        const msgs = await MessageModel.find({});
        socketServer.emit("new_msgs", msgs);
      } catch (e) {
        console.log(e);
      }
    });
  });
  //Recibiendo los datos del nuevo producto
  socketServer.on("connection", (socket) => {
    console.log("Cliente conectado " + socket.id);
    socket.on("new-product", async (newProduct) => {
      try {
        let productCreated = await PServices.createProduct({
          title: newProduct.title,
          description: newProduct.description,
          price: newProduct.price,
          thumbnail: newProduct.thumbnail,
          code: newProduct.code,
          stock: newProduct.stock,
          category: newProduct.category,
        });

        socketServer.emit("products", productCreated);
      } catch (error) {
        console.log(error);
      }
    });
  });
}
