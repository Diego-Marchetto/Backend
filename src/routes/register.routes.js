import express from "express";
import passport from "passport";
export const registerRoutes = express.Router();

registerRoutes.get("/", (req, res) => {
  return res.render("register");
});

registerRoutes.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/errorLogin" }),
  async (req, res) => {
    let newUser = req.body;
    console.log(req.body);
    if (!newUser) {
      res.render("errorRegister");
    }

    req.session.user = {
      _id: req.user._id,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
      age: newUser.age,
      role: "user",
      cid: req.user.cid,
    };
    console.log(req.session.user);

    res.redirect("/perfil");
  }
);
