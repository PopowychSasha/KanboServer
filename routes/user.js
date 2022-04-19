const express = require("express");
const routes = express.Router();
const userControllers = require("../controllers/user.js");

routes.post("/api/auth/signup", userControllers.signup);
routes.post("/api/auth/signin", userControllers.signin);
routes.get("/api/account", userControllers.getAccount);

module.exports = routes;
