import importModels from "../dao/factory.js";

const models = await importModels();
const ticketsModel = models.tickets;
//const productsModel = models.products;

class TicketService {
  async createTicket(cid, user) {
    const response = await ticketsModel.createTicket(cid, user);

    return response;
  }
}

export const TService = new TicketService();
