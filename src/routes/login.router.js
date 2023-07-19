import { Router } from "express";
import passport from "passport";

const loginRoutes = Router();

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
      console.log(req.user);
      req.session.user = {
        _id: req.user._id,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        username: req.user.username,
        age: req.user.age,
        role: req.user.role,
        cid: req.user.cid,
      };
      res.redirect("/products");
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

export default loginRoutes;