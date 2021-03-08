"use strict";

const Controller = require("../controller/Usuario");

module.exports = (app) => {
    let c = new Controller();
    app.get("/api/usuarios/:id", c.get);
    app.get("/api/usuarios", c.get);
    app.post("/api/usuarios", c.post);
    app.patch("/api/usuarios/:id", c.patch);
    app.delete("/api/usuarios/:id", c.delete);
    app.post("/api/login", c.login);
    app.get("/api/checkLogin", c.checkLogin);
};
