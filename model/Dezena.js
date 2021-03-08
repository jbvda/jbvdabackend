"use strict";

const { DataTypes } = require("sequelize"),
    sequelize = require("./sequelize"),
    Usuario = require("./Usuario"),
    Sorteio = require("./Sorteio");

const Dezena = sequelize.define(
    "dezenas_sorteadas",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_sorteio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Sorteio,
                key: "id",
            },
        },
        dezena: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Dezena.getAuthCheck = function () {
    return true;
};

Dezena.postAuthCheck = async function (auth) {
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

Dezena.patchAuthCheck = async function (auth) {
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

Dezena.deleteAuthCheck = async function (auth) {
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

Sorteio.hasMany(Dezena, {
    foreignKey: "id_sorteio",
    as: "dezenas",
});
Dezena.belongsTo(Sorteio, {
    foreignKey: "id_sorteio",
    as: "sorteio",
});

Dezena.addScope("sorteio", {
    include: "sorteio",
});

module.exports = Dezena;
