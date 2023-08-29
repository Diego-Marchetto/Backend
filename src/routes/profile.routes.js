import express from "express";
export const profileRoutes = express.Router();

profileRoutes.get("/", (req, res) => {
  let { age, email, first_name, last_name, role } = req.session.user;

  res.render("profile", { age, email, first_name, last_name, role });
});
