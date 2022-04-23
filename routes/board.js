const express = require('express');
const routes = express.Router();
const boardControllers = require('../controllers/board');

routes.post('/api/board',boardControllers.createBoard);

module.exports = routes;