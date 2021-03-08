"use strict";

const Controller = require("../controller/DezenaAnimal");

module.exports = (app) => {
  let c = new Controller();
  app.get("/api/dezenasanimais/:id", c.get);
  app.get("/api/dezenasanimais", c.get);
  app.post("/api/dezenasanimais", c.post);
  app.patch("/api/dezenasanimais/:id", c.patch);
  app.delete("/api/dezenasanimais/:id", c.delete);
};
