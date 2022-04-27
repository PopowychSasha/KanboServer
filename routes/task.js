const express = require('express');
const taskControllers = require('../controllers/task');
const routes = express.Router();

routes.post('/api/task',taskControllers.createTask);
routes.post('/api/task/status',taskControllers.setNewTaskStatus);
routes.get('/api/tasks/board/:id',taskControllers.getTasksForBoard);
routes.post('/api/task/edit',taskControllers.editTask);

module.exports = routes;