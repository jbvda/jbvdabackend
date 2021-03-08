"use strict";

const Controller = require("../controller/Parametro");

module.exports = (app) => {
  let c = new Controller();
  app.get("/api/parametros/:id", c.get);
  app.get("/api/parametros", c.get);
  app.post("/api/parametros", c.post);
  app.patch("/api/parametros/:id", c.patch);
  app.delete("/api/parametros/:id", c.delete);
};
