"use strict";

const { DataTypes } = require("sequelize"),
    Usuario = require("./Usuario"),
    sequelize = require("./sequelize");

const Parametro = sequelize.define(
    "parametros",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING(64),
            allowNull: null,
            unique: true,
        },
        valor: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Parametro.getAuthCheck = function () {
    return true;
};

Parametro.postAuthCheck = async function (auth) {
    let authorized = false,
        usuario = await Usuario.scope("login").findOne({
            where: {
                login: auth.login,
            },
        });
    if (usuario) {
        let senhaValida = await usuario.senhaValida(auth.senha);
        if (senhaValida && usuario.nivel_acesso >= 2) authorized = true;
    }
    return authorized;
};

Parametro.patchAuthCheck = async function (auth) {
    let authorized = false,
        usuario = await Usuario.scope("login").findOne({
            where: {
                login: auth.login,
            },
        });
    if (usuario) {
        let senhaValida = await usuario.senhaValida(auth.senha);
        if (senhaValida && usuario.nivel_acesso >= 2) authorized = true;
    }
    return authorized;
};

Parametro.deleteAuthCheck = async function (auth) {
    let authorized = false,
        usuario = await Usuario.scope("login").findOne({
            where: {
                login: auth.login,
            },
        });
    if (usuario) {
        let senhaValida = await usuario.senhaValida(auth.senha);
        if (senhaValida && usuario.nivel_acesso >= 2) authorized = true;
    }
    return authorized;
};

Parametro.getParam = async function (nome) {
    let param = await Parametro.findOne({
        where: {
            nome: nome,
        },
    });
    return param.valor;
};

Parametro.updateParam = function (nome, valor) {
    Parametro.upsert({
        nome: nome,
        valor: valor,
    });
};

module.exports = Parametro;
