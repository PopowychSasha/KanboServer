const express = require('express');
const routes = express.Router();
const taskDetailControlles = require('../controllers/taskDetail');

routes.get('/api/task/details/:id',taskDetailControlles.getTaskDetails);
routes.post('/api/task/create/details',taskDetailControlles.createTaskDetails);

module.exports = routes;