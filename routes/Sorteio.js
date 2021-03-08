"use strict";

const Controller = require("../controller/Sorteio");

module.exports = (app) => {
    let c = new Controller();
    app.get("/api/sorteios/:id", c.get);
    app.get("/api/sorteios", c.get);
    app.post("/api/sorteios", c.post);
    app.patch("/api/sorteios/:id", c.patch);
    app.delete("/api/sorteios/:id", c.delete);
    app.patch("/api/calcularVencedor", c.calcularVencedor);
};
