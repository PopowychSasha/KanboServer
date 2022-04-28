const express = require("express");
const routes = express.Router();
const userControllers = require("../controllers/user.js");
const checkAuthMiddleware = require('../middleware/check-auth');

routes.post("/api/auth/signup", userControllers.signup);
routes.post("/api/auth/signin", userControllers.signin);
routes.get("/api/account",checkAuthMiddleware.checkAuth, userControllers.getAccount);
routes.get("/api/logout", userControllers.logout);

module.exports = routes;
