const express = require('express');
const register = require('../controllers/usersController');

const usersRouter = express.Router();

const jsonParser = express.json();

usersRouter.post('/register', jsonParser, register)

module.exports = usersRouter;