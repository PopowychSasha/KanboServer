const express = require('express');
const routes = express.Router();
const taskDetailControlles = require('../controllers/taskDetail');

routes.post('/api/task/details',taskDetailControlles.getTaskDetails);
routes.post('/api/task/create/details',taskDetailControlles.createTaskDetails);

module.exports = routes;