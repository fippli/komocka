const Database = require("../Database/index.js");

const databaseApi = (app, { endpoint, status }) => {
  app.get(endpoint, (_, res) => {
    res.status(status).send(Database.Find(endpoint));
  });

  app.get(`${endpoint}/:id`, (req, res) => {
    res.status(status).send(Database.Find(endpoint, req.params.id));
  });

  app.delete(endpoint, (_, res) => {
    res.status(status).send(Database.Delete(endpoint));
  });

  app.delete(`${endpoint}/:id`, (req, res) => {
    const entry = Database.Delete(endpoint, req.params.id);
    res.status(entry ? status : 204).send(entry);
  });

  app.put(`${endpoint}/:id`, (req, res) => {
    console.log(req.body);
    const entry = Database.Update(endpoint, req.params.id, req.body);
    res.status(status).send(entry);
  });

  app.post(endpoint, (req, res) => {
    const newEntry = Database.Insert(endpoint, req.body);
    res.status(status).send(newEntry);
  });
};

module.exports = databaseApi;
