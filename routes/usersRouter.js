const express = require('express');
const {register, login} = require('../controllers/usersController');

const usersRouter = express.Router();

const jsonParser = express.json();

usersRouter.post('/register', jsonParser, register);
usersRouter.post('/login', jsonParser, login);

module.exports = usersRouter;