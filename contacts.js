const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return Object.values(JSON.parse(data));
}

async function getContactById(contactId) {
  const resp = await listContacts();
  const data = resp.find(({ id }) => id === contactId);
  if (!data) {
    return null;
  }
  return data;
}

async function removeContact(contactId) {
  const resp = await listContacts();
  const idx = resp.findIndex(({ id }) => id === contactId);
  const contacts = resp.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return resp[idx];
}

async function addContact(name, email, phone) {
  const resp = await listContacts();
  const add = { id: uuidv4(), name, email, phone };
  const addContacts = [...resp, add];
  await fs.writeFile(contactsPath, JSON.stringify(addContacts));
  return add;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
