import express from "express";
import passport from "passport";
export const loginRoutes = express.Router();

loginRoutes.get("/", (req, res) => {
  return res.render("login");
});
loginRoutes.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/errorLogin" }),
  async (req, res) => {
    if (!req.user) {
      return res.render("errorLogin");
    }
    console.log("saliendo del login");
    console.log(req.user);
    req.session.user = req.user;
    res.redirect("/perfil");
  }
);
loginRoutes.get(
  "/github",
  passport.authenticate("github", { scope: ["user : email"] })
);

loginRoutes.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;

    res.redirect("/perfil");
  }
);

loginRoutes.get("/show", (req, res) => {
  return res.send(JSON.stringify(req.session));
});
