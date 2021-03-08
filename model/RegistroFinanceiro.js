"use strict";

const { DataTypes } = require("sequelize"),
    sequelize = require("./sequelize"),
    Usuario = require("./Usuario");

const RegistroFinanceiro = sequelize.define(
    "registros_financeiros",
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
        tipo: {
            type: DataTypes.ENUM("e", "s"),
            allowNull: false,
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

RegistroFinanceiro.getAuthCheck = function () {
    return true;
};

RegistroFinanceiro.postAuthCheck = async function (auth) {
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

RegistroFinanceiro.patchAuthCheck = async function (auth) {
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

RegistroFinanceiro.deleteAuthCheck = async function (auth) {
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

Usuario.hasMany(RegistroFinanceiro, {
    foreignKey: "id_usuario",
    targetKey: "id",
    as: "registros",
});

RegistroFinanceiro.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    targetKey: "id",
    as: "usuario",
});

RegistroFinanceiro.addScope("usuario", {
    include: ["usuario"],
});

module.exports = RegistroFinanceiro;
