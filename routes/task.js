const express = require('express');
const taskControllers = require('../controllers/task');
const checkAuthMiddleware = require('../middleware/check-auth');
const routes = express.Router();

routes.post('/api/task',checkAuthMiddleware.checkAuth,taskControllers.createTask);
routes.post('/api/task/status',checkAuthMiddleware.checkAuth,taskControllers.setNewTaskStatus);
routes.get('/api/tasks/board/:id',checkAuthMiddleware.checkAuth,taskControllers.getTasksForBoard);
routes.post('/api/task/edit',checkAuthMiddleware.checkAuth,taskControllers.editTask);
routes.get('/api/task/:id',checkAuthMiddleware.checkAuth,taskControllers.getTask);
routes.delete('/api/task/:id',checkAuthMiddleware.checkAuth,taskControllers.deleteTask);

module.exports = routes;