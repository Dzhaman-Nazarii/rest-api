const { createContactSchema, updateContactSchema } = require('../schemas/contactsSchemas.js');
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
    const result = await getContactById(id);
    if (result) {
        return res.status(200).json(result)
    }   return res.status(404).json({"message": "Not found"})
};

const deleteContact = async (req, res) => {
    const {id} = req.params;
    const result = await removeContact(id)
    if (result) {
        return res.status(200).json(result)
    }   return res.status(404).json({"message": "Not found"})
};

const createContact = async (req, res) => {
    const {error, value} = createContactSchema.validate(req.body);
    if(error){
        res.status(400).json({"message": error.message})
    }   const result = await addContact (value);
        res.status(201).json(result);
};

const updateContact = async (req, res) => {
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
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact
}