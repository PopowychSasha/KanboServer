const express = require('express');
const routes = express.Router();
const taskDetailControlles = require('../controllers/taskDetail');
const checkAuthMiddleware = require('../middleware/check-auth');

routes.get('/api/task/details/:id',checkAuthMiddleware.checkAuth,taskDetailControlles.getTaskDetails);
routes.post('/api/task/create/details',checkAuthMiddleware.checkAuth,taskDetailControlles.createTaskDetails);

module.exports = routes;