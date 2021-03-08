"use strict";

const path = require("path"),
    fs = require("fs");

module.exports = (app) => {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            console.log("Não foi possivel ler o diretório: " + err);
            return;
        }
        files.forEach((file) => {
            if (file.includes("js") && file !== "index.js") {
                require(path.join(__dirname, file))(app);
            }
        });
    });
};
