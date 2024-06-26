const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const UserModel = require("../models/users");
const sendEmail = require('../helpers/sendEmail');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (user !== null) {
      return res.status(409).send({ message: "User already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID();
    await UserModel.create({ name, email, password: passwordHash, verificationToken });
    await sendEmail({
      to: email,
      subject: `Welcome on board, ${name}`,
      html: `
              <p>To confirm your registration, please click on lick below</p>
              <p>
                <a href="http://localhost:8080/api/users/verify/${verificationToken}">Click here</a>
              </p>
            `,
      text: `
      To confirm your registration, please click on lick belown\n
      http://localhost:8080/api/users/verify/${verificationToken}
            `
    });
    res.status(201).send({ message: "Registration successfull" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (user === null) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch !== true) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }
    if(user.verify !== true) {
      return res.status(404).send({message: "Please verify your email"})
    }
    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    await UserModel.findByIdAndUpdate(user._id, {token}).exec();
    res.send({ token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try{
    await UserModel.findByIdAndUpdate(req.user.id, {token: null}).exec();
    res.status(204).end();
  } catch(error) {
    next(error);
  }
}

const uploadAvatar = async(req, res, next) => {
  try{
    await fs.rename(req.file.path, path.join(__dirname, "..", "public", req.file.filename));
    const doc = await UserModel.findByIdAndUpdate(req.user.id, {avatarURL: req.file.filename}, {new: true}).exec();
    if(doc === null) {
      return res.status(404).send({message: "User not found"});
    }
    res.send(doc);
  } catch(error){
    next(error)
  }
}

const verify = async(req, res, next) => {
  try{
    const {token} = req.params;
    const user = await UserModel.findOne({verificationToken: token}).exec();
    if(user === null) {
      return res.status(401).send({message: "Invalid token"})
    }
      await UserModel.findByIdAndUpdate(user._id, {verify: true, verificationToken: null}).exec();
    res.send({message: "User verified"});
  } catch(error) {
    next(error)
  }
}

module.exports = { register, login, logout, uploadAvatar, verify };