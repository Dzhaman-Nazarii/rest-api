const express = require('express');
const upload = require('../middleware/upload');
const {register, login, logout, uploadAvatar, verify} = require('../controllers/usersController');
const auth = require('../middleware/auth');

const usersRouter = express.Router();

const jsonParser = express.json();

usersRouter.post('/register', jsonParser, register);
usersRouter.post('/login', jsonParser, login);
usersRouter.post('/logout', auth, logout);
usersRouter.patch('/avatars', auth, upload.single('avatar'), uploadAvatar);
usersRouter.get('/verify/:token', verify)

module.exports = usersRouter;