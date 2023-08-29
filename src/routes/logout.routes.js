import express from "express";
export const logoutRoutes = express.Router();

logoutRoutes.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }

    return res.redirect("/login");
  });
});
