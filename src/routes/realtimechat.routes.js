import express from "express";
export const realTimeChat = express.Router();

realTimeChat.get("/", (req, res) => {
  return res.status(200).render("realtimechat", {});
});
