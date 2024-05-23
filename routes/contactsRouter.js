const express = require('express');
const {
  getAll,
  getById,
  remove,
  create,
  update,
} = require('../controllers/contactsControllers.js')

const contactsRouter = express.Router();

contactsRouter.get("/", getAll);

contactsRouter.get("/:id", getById);

contactsRouter.delete("/:id", remove);

contactsRouter.post("/", create);

contactsRouter.put("/:id", update);


module.exports = contactsRouter;