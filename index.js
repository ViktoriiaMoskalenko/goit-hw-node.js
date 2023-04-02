const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "get":
      const get = await getContactById(id);
      if (!get) {
        console.error(`Contact with id=${id} not found`);
        return;
      }
      console.table(get);
      break;

    case "add":
      const add = await addContact(name, email, phone);
      console.table(add);
      break;

    case "remove":
      const remove = await removeContact(id);
      if (!remove) {
        console.error(`Contact with id=${id} not found`);
        return;
      }
      console.table(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
