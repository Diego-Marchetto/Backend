export default class TicketsDTO {
  constructor(ticket) {
    this.cartId = ticket.cid;
    this.code = ticket.code;
    this.purchase_datetime = ticket.purchase_datetime;
    this.amount = ticket.amount;
    this.purchaser = ticket.email;
    this.products = ticket.products;
  }
}
