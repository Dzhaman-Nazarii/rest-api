const fs = require('node:fs').promises;
const path = require('node:path');
const crypto = require('node:crypto');

const contactsPath = path.join(__dirname, '../db/contacts.json');

async function read(){
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
}

async function write(data) {
    return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
    const data = await read();
    return data;
}
  
async function getContactById(contactId) {
    const data = await read();
    return data.find((contact) => contact.id === contactId);
}

async function addContact({name, email, phone}) {
    const data = await read();
    const newContact = {
        id: crypto.randomUUID(),
        name,
        email,
        phone
    }
    data.push(newContact);
    await write(data);
    return newContact;
}

async function removeContact(contactId) {
    const data = await read();
    const index = data.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [removedContact] = data.splice(index, 1);
    await write(data);
    return removedContact;
}

const reviseContact = async (contactId, contact) => {
    const data = await read();
    const index = data.findIndex((c) => c.id === contactId);
    if (index === -1) {
        return undefined;
    }
        const updatedContact = { ...data[index], ...contact, id: contactId };
        data[index] = updatedContact;
        await write(data);
        return updatedContact;
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    reviseContact,
    removeContact
}