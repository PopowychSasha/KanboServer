const express = require('express');
const routes = express.Router();
const boardControllers = require('../controllers/board');
const checkAuthMiddleware = require('../middleware/check-auth');

routes.post('/api/board',checkAuthMiddleware.checkAuth,boardControllers.createBoard);
routes.get('/api/boards',boardControllers.getBoards);
routes.post('/api/board/delete',boardControllers.deleteBoard);

module.exports = routes;