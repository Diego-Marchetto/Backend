import { TService } from "../services/tickets.service.js";

class TicketsController {
  getById = async (req, res) => {
    try {
      const { tid } = req.params;
    } catch (error) {
      throw new error();
    }
  };
  createTicket = async (req, res) => {
    try {
      const cid = req.params.cid;
      const user = req.session.user;
      const response = await TService.createTicket(cid, user);
      return res.json(response);
    } catch (error) {
      res.send("error se pudrio todo");
    }
  };
}

export const ticketsController = new TicketsController();
