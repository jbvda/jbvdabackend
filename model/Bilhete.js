"use strict";

const { DataTypes } = require("sequelize"),
    sequelize = require("./sequelize"),
    Usuario = require("./Usuario");

const Bilhete = sequelize.define(
    "bilhetes",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: Usuario,
                key: "id",
            },
        },
    },
    {
        freezeTableName: true,
    }
);

Bilhete.getAuthCheck = function () {
    return true;
};

Bilhete.postAuthCheck = async function (auth) {
    let authorized = false,
        usuario = await Usuario.scope("login").findOne({
            where: {
                login: auth.login,
            },
        });
    if (usuario) {
        let senhaValida = await usuario.senhaValida(auth.senha);
        if (senhaValida && usuario.nivel_acesso >= 1) authorized = true;
    }
    return authorized;
};

Bilhete.patchAuthCheck = async function (auth) {
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

Bilhete.deleteAuthCheck = async function (auth) {
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

Usuario.hasMany(Bilhete, {
    foreignKey: "id_usuario",
    targetKey: "id",
    as: "bilhetes",
});

Bilhete.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    targetKey: "id",
    as: "usuario",
});

Bilhete.addScope("apostas", {
    include: ["apostas"],
});

Bilhete.addScope("usuario", {
    include: ["usuario"],
});

module.exports = Bilhete;
