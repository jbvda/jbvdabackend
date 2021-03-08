"use strict";

const Controller = require("../controller/Multiplicador");

module.exports = (app) => {
  let c = new Controller();
  app.get("/api/multiplicadores/:id", c.get);
  app.get("/api/multiplicadores", c.get);
  app.post("/api/multiplicadores", c.post);
  app.patch("/api/multiplicadores/:id", c.patch);
  app.delete("/api/multiplicadores/:id", c.delete);
};
