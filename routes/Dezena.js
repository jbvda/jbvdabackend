"use strict";

const Controller = require("../controller/Dezena");

module.exports = (app) => {
  let c = new Controller();
  app.get("/api/dezenas/:id", c.get);
  app.get("/api/dezenas", c.get);
  app.post("/api/dezenas", c.post);
  app.patch("/api/dezenas/:id", c.patch);
  app.delete("/api/dezenas/:id", c.delete);
};
