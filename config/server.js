"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    session = require("express-session"),
    app = express();

try {
    if (process.env.ENV === "prod") {
        //Cria um middleware onde todas as requests passam por ele
        app.use((req, res, next) => {
            //Checa se o protocolo informado nos headers é HTTP
            if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
                //Redireciona pra HTTPS
                res.redirect(`https://${req.headers.host}${req.url}`);
            //Se a requisição já é HTTPS
            else next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado
        });
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
        cors({
            origin: "*",
        })
    );
    app.use(
        session({
            secret: "oreinoanimalespetacular",
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 60000,
            },
        })
    );
} catch (err) {
    console.log(err);
}

module.exports = app;
