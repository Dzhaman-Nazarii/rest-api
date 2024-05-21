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
    const index = data.findIndex((contact) => contact.id === contactId);
    const newContacts = {
        ...data.slice(0, index),
        ...data.slice(index + 1)
    };
    await write(newContacts);
    return data[index];
}

async function reviseContact (contactId, contact) {
    const data = await read();
    const index = data.findIndex((contact) => contact.id === contactId);
    if(index === -1) {
        return undefined;
    }
    data[index] = {...contact, id: contactId };
    await write(data);
    return {...contact, id: contactId}
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    reviseContact,
    removeContact
}