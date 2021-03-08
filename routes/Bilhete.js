"use strict";

const Controller = require("../controller/Bilhete");

module.exports = (app) => {
  let c = new Controller();
  app.get("/api/bilhetes/:id", c.get);
  app.get("/api/bilhetes", c.get);
  app.post("/api/bilhetes", c.post);
  app.patch("/api/bilhetes/:id", c.patch);
  app.delete("/api/bilhetes/:id", c.delete);
};
