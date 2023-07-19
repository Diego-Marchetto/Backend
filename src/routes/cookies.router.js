import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", (req, res) => {
  try {
    return res
      .cookie("cookie-test", "informacion muy poderosa", {
        maxAge: 10000,
        signed: true,
      })
      .send({});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Error getting the products" });
  }
});

cookiesRouter.get("/get", async (req, res) => {
  try {
    return res.send(req.signedCookies);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Error getting the products" });
  }
});

cookiesRouter.get("/delete", async (req, res) => {
  try {
    return res.clearCookie("cookie-test").send("Cookie Removed");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Error getting the products" });
  }
});

cookiesRouter.get("/session", async (req, res) => {
  try {
    if (req.session.counter) {
      req.session.counter++;
      res.send("nos visitaste " + req.session.counter);
    } else {
      req.session.counter = 1;
      res.send("bienvenido");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Error getting sessions" });
  }
});

cookiesRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.send("Logout ok!");
  });
});

cookiesRouter.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "pepe" || password !== "pepepass") {
    return res.send("login failed");
  }
  req.session.user = username;
  req.session.admin = true;
  res.send("login success!");
});

cookiesRouter.get("/perfil", (req, res) => {
  if (req.session && req.session.user) {
    return res.send("logueado como admin o usuario");
  } else {
    return res.send("no estas logueado");
  }
});

export default cookiesRouter;