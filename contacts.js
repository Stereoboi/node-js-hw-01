const fs = require("fs").promises;
const path = require("path");

const contactsPath = "./db/contacts.json";

async function listContacts() {
  try {
    const list = JSON.parse(
      await fs.readFile(path.resolve(contactsPath), "utf8")
    );
    console.log(list);
    return list;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await listContacts();
    const contactById = contactList.filter((el) => {
      return el.id === JSON.stringify(contactId);
    });
    console.log(contactById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactList = await listContacts();
    const removeById = contactList.filter((el) => {
      return el.id !== JSON.stringify(contactId);
    });
    await fs.writeFile(path.resolve(contactsPath), JSON.stringify(removeById));
    console.log(removeById);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactList = await listContacts();
    contactList.push({
      id: Math.floor(Math.random() * 100 + 1),
      name,
      email,
      phone,
    });

    await fs.writeFile(path.resolve(contactsPath), JSON.stringify(contactList));
    console.log(contactList);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
