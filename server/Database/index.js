// Emulate some kind of document database

const uuid = require("uuid").v4;
const { BrowserWindow } = require("electron");

const notifyClient = (db) => {
  const [window] = BrowserWindow.getAllWindows();
  window.webContents.send("dbUpdate", db);
};

const Database = (function () {
  let database = {};

  const Snapshot = () => {
    return { ...database };
  };

  const Replace = (newDatabase) => {
    database = newDatabase;
    notifyClient(database);
  };

  const Find = (document, id) => {
    if (id !== undefined) {
      return database[document].filter((entry) => entry._id === id)[0];
    }

    if (database[document]) {
      return database[document];
    }

    return [];
  };

  const Insert = (document, data) => {
    const newEntry = { _id: uuid(), ...data };
    if (database[document]) {
      Replace({
        ...database,
        [document]: [...database[document], newEntry],
      });
    } else {
      Replace({
        ...database,
        [document]: [newEntry],
      });
    }

    return newEntry;
  };

  const Delete = (document, id) => {
    if (id === undefined) {
      Replace({
        ...database,
        [document]: [],
      });
      return [];
    }
    if (database[document]) {
      const entry = database[document].filter((entry) => entry._id === id)[0];
      Replace({
        ...database,
        [document]: database[document].filter((entry) => entry._id !== id),
      });
      return entry;
    } else {
      return null;
    }
  };

  const Update = (document, id, data) => {
    if (database[document]) {
      const exists =
        database[document].filter((entry) => entry._id === id).length > 0;
      if (exists) {
        Replace({
          ...database,
          [document]: database[document].map((entry) => {
            if (entry._id === id) {
              return { ...data, _id: id };
            }
            return entry;
          }),
        });
      } else {
        Insert(document, { ...data, _id: id });
      }
    } else {
      Replace({
        ...database,
        [document]: [{ ...data, _id: id }],
      });
    }
  };

  return {
    Snapshot,
    Replace,
    Find,
    Insert,
    Delete,
    Update,
  };
})();

module.exports = Database;
