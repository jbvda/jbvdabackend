"use strict";

const Controller = require("../controller/RegistroFinanceiro");

module.exports = (app) => {
    let c = new Controller();
    app.get("/api/registrosfinanceiros/:id", c.get);
    app.get("/api/registrosfinanceiros", c.get);
    //   app.post("/api/registrosfinanceiros", c.post);
    //   app.patch("/api/registrosfinanceiros/:id", c.patch);
    //   app.delete("/api/registrosfinanceiros/:id", c.delete);
};
