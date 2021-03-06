const express = require('express');
const routes = express.Router();
const userControllers = require('../controllers/user.js');

routes.post('/api/auth/signup',userControllers.signup);
routes.get('/api/auth/signin',userControllers.signin);

module.exports = routes;