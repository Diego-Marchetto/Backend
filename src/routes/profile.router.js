import express from "express";
import { Router } from "express";

const profileRoutes = Router();

profileRoutes.get("/", (req, res) => {
  let { age, email, first_name, last_name, role } = req.session.user;

  res.render("profile", { age, email, first_name, last_name, role });
});

export default profileRoutes;