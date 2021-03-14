"use strict";

const Controller = require("../controller/Aposta");

module.exports = (app) => {
    let c = new Controller();
    app.get("/api/apostas/:id", c.get);
    app.get("/api/apostas", c.get);
    app.post("/api/apostas", c.post);
    app.patch("/api/apostas/:id", c.patch);
    app.patch("/api/apostas/retirar/:id", c.retirar);
    app.delete("/api/apostas/:id", c.delete);
};
