const { createContactSchema } = require('../schemas/contactsSchemas.js');
const {
    listContacts,
    getContactById,
    addContact,
    reviseContact,
    removeContact
} = require('../services/contactsServices.js')

const getAllContacts = async (req, res) => {
    const result = await listContacts();
    res.status(200).json(result)
}

const getOneContact = async (req, res) => {
    const {id} = req.params;
    const result = await getContactById(id)
    if (result === undefined) {
        res.status(404).json({"message": "Not found"})
    }   res.status(200).json(result)
};

const deleteContact = async (req, res) => {
    const {id} = req.params;
    const result = await removeContact(id)
    if (result === undefined) {
         res.status(404).json({"message": "Not found"})
    }   res.status(200).json(result)
};

const createContact = async (req, res) => {
    const {error, value} = createContactSchema.validate(req.body);
    if(error){
        res.status(400).json({"message": error.message})
    }  const result = await addContact (value);
        res.status(201).json(result);
};

const updateContact = (req, res) => {};

module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact
}