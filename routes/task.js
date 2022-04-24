const express = require('express');
const taskControllers = require('../controllers/task');
const routes = express.Router();

routes.post('/api/task',taskControllers.createTask);

module.exports = routes;