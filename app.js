const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('node:path');

const auth = require('./middleware/auth.js')

const contactsRouter = require("./routes/contactsRouter.js");
const usersRouter = require("./routes/usersRouter.js");

const app = express();

app.use(morgan("tiny"));
app.use(cors());

app.use("/api/contacts", auth, contactsRouter);
app.use("/api/users", usersRouter);
app.use("/api/avatars", express.static(path.join(__dirname, "public")))

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;