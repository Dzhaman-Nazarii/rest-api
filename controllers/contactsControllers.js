const { createContactSchema, updateContactSchema } = require('../schemas/contactsSchemas.js');
const {
    listContacts,
    getContactById,
    addContact,
    reviseContact,
    removeContact
} = require('../services/contactsServices.js')

const contactModel = require('../models/contacts.js');

const getAll = async (req, res, next) => {
    try {
        const docs = await contactModel.find().exec();
        res.send(docs);
    } catch(error){
        next(error)
    }
}

const getById = async (req, res) => {
    const {id} = req.params;
    const result = await getContactById(id);
    if (result) {
        return res.status(200).json(result)
    }   return res.status(404).json({"message": "Not found"})
};

const remove = async (req, res) => {
    const {id} = req.params;
    const result = await removeContact(id)
    if (result) {
        return res.status(200).json(result)
    }   return res.status(404).json({"message": "Not found"})
};

const create = async(req, res, next) => {
    const {name, email, phone, favorite} = req.body;
    const contact = {
        name,
        email,
        phone,
        favorite
    }
    try{
        const doc = await contactModel.create(contact);
        res.status(201).send(doc);
    } catch(error){
        next(error)
    }
};

const update = async (req, res) => {
    const { error, value } = updateContactSchema.validate(req.body);
    const contactId = req.params.id;

    if (Object.keys(value).length === 0) {
        return res.status(400).json({ "message": "Body must have at least one field" });
    } else if (error) {
        return res.status(400).json({ "message": error.message });
    }

    const result = await reviseContact(contactId, value);
    if (!result) {
        return res.status(404).json({ "message": "Not found" });
    }

    res.status(200).json(result);
};

module.exports = {
    getAll,
    getById,
    remove,
    create,
    update
}