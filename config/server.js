"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    session = require("express-session"),
    app = express();

try {
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
                maxAge: 60000
            }
        })
    );
} catch (err) {
    console.log(err);
}

module.exports = app;
