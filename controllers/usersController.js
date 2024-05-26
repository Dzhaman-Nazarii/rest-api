const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (user !== null) {
      return res.status(409).send({ message: "User already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await UserModel.create({ name, email, password: passwordHash });
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
    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    await UserModel.findByIdAndUpdate(user._id, {token}).exec()
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
    next(error)
  }
}

module.exports = { register, login, logout };