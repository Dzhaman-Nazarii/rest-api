const express = require('express');
const crypto = require('node:crypto');
const path = require('node:path');
const multer = require('multer');
const {register, login, logout, uploadAvatar} = require('../controllers/usersController');
const auth = require('../middleware/auth')

const usersRouter = express.Router();

const jsonParser = express.json();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "tmp"));
    },
    filename: (req,file,cb) => {
        const extname = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extname);
        const suffix = crypto.randomUUID();
        cb(null, `${basename}-${suffix}${extname}`);
    }
});

const upload = multer({storage});

usersRouter.post('/register', jsonParser, register);
usersRouter.post('/login', jsonParser, login);
usersRouter.post('/logout', auth, logout);
usersRouter.patch('/avatars', auth, upload.single('avatar'), uploadAvatar);

module.exports = usersRouter;