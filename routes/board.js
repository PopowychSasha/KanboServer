const express = require('express');
const routes = express.Router();
const boardControllers = require('../controllers/board');
const checkAuthMiddleware = require('../middleware/check-auth');

routes.post('/api/board',checkAuthMiddleware.checkAuth,boardControllers.createBoard);
routes.get('/api/boards',checkAuthMiddleware.checkAuth,boardControllers.getBoards);
routes.delete('/api/delete/board/:id',checkAuthMiddleware.checkAuth,boardControllers.deleteBoard);
routes.get('/api/board/name/:id',checkAuthMiddleware.checkAuth,boardControllers.getBoardName);
module.exports = routes;