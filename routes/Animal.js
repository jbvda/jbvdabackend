"use strict";

const Controller = require("../controller/Animal");

module.exports = (app) => {
    let c = new Controller();
    app.get("/api/animais/:id", c.get);
    app.get("/api/animais", c.get);
    app.post("/api/animais", c.post);
    app.patch("/api/animais/:id", c.patch);
    app.delete("/api/animais/:id", c.delete);
};
