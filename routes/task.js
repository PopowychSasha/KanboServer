const express = require('express');
const taskControllers = require('../controllers/task');
const routes = express.Router();

routes.post('/api/task',taskControllers.createTask);
routes.post('/api/task/status',taskControllers.setNewTaskStatus);
routes.post('/api/tasks/board',taskControllers.getTasksForBoard);

module.exports = routes;