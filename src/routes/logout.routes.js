import express from "express";
import { Router } from "express";

const logoutRoutes = Router();

logoutRoutes.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    return res.redirect("/login");
  });
});

export default logoutRoutes;