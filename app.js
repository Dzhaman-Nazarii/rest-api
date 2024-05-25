const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const contactsRouter = require("./routes/contactsRouter.js");
const usersRouter = require("./routes/usersRouter.js");

const app = express();

app.use(morgan("tiny"));
app.use(cors());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;