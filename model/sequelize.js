"use strict";

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: "mariadb",
    logging: console.log,
    dialectOptions: {
        options: {
            validateBulkLoadParameters: false,
        },
    },
    define: {
        freezeTableName: true,
    },
    options: {
        instanceName: process.env.DB_INSTANCE,
    },
});

module.exports = sequelize;
