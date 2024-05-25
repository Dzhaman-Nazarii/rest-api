const express = require('express');
const {
  getAll,
  getById,
  remove,
  create,
  update,
  updateStatusContact
} = require('../controllers/contactsControllers.js')

const jsonParser = express.json();

const contactsRouter = express.Router();

contactsRouter.get("/", getAll);

contactsRouter.get("/:id", getById);

contactsRouter.delete("/:id", remove);

contactsRouter.post("/", jsonParser, create);

contactsRouter.put("/:id", jsonParser, update);

contactsRouter.patch("/:id/favorite", jsonParser, updateStatusContact);

module.exports = contactsRouter;