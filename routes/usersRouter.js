const express = require('express');
const {register, login, logout} = require('../controllers/usersController');
const auth = require('../middleware/auth')

const usersRouter = express.Router();

const jsonParser = express.json();

usersRouter.post('/register', jsonParser, register);
usersRouter.post('/login', jsonParser, login);
usersRouter.post('/logout', auth, logout);

module.exports = usersRouter;