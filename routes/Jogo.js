"use strict";

const Controller = require("../controller/Jogo");

module.exports = (app) => {
  let c = new Controller();
  app.get("/api/jogos/:id", c.get);
  app.get("/api/jogos", c.get);
  app.post("/api/jogos", c.post);
  app.patch("/api/jogos/:id", c.patch);
  app.delete("/api/jogos/:id", c.delete);
};
