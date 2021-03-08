"use strict";

const { DataTypes } = require("sequelize"),
    sequelize = require("./sequelize"),
    Usuario = require("./Usuario"),
    Jogo = require("./Jogo");

const Multiplicador = sequelize.define(
    "multiplicadores_aposta",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_jogo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Jogo,
                key: "id",
            },
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 1,
        },
        numero_acertos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        freezeTableName: true,
    }
);

Multiplicador.getAuthCheck = function () {
    return true;
};

Multiplicador.postAuthCheck = async function (auth) {
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

Multiplicador.patchAuthCheck = async function (auth) {
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

Multiplicador.deleteAuthCheck = async function (auth) {
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

Jogo.hasMany(Multiplicador, {
    foreignKey: "id_jogo",
    as: "multiplicadores",
});

Multiplicador.belongsTo(Jogo, {
    foreignKey: "id_jogo",
    as: "jogo",
});

Multiplicador.addScope("jogo", {
    include: "jogo",
});
Multiplicador.addScope("apostas", {
    include: "apostas",
});

module.exports = Multiplicador;
