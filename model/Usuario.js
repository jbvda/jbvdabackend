"use strict";

const { DataTypes } = require("sequelize"),
    sequelize = require("./sequelize"),
    bcrypt = require("bcrypt");

const Usuario = sequelize.define(
    "usuarios",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        login: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        nivel_acesso: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        freezeTableName: true,
        hooks: {
            beforeCreate: function (usuario) {
                const salt = bcrypt.genSaltSync();
                usuario.senha = bcrypt.hashSync(usuario.senha, salt);
            },
        },
        defaultScope: {
            attributes: {
                exclude: ["senha"],
            },
        },
    }
);

Usuario.prototype.senhaValida = function (senha) {
    return bcrypt.compare(senha, this.senha);
};

Usuario.getAuthCheck = async function (auth) {
    return true;
};

Usuario.postAuthCheck = async function (auth) {
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

Usuario.patchAuthCheck = async function (auth) {
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

Usuario.deleteAuthCheck = async function (auth) {
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

Usuario.addScope("login", {});
Usuario.addScope("bilhetes", {
    include: "bilhetes",
    attributes: {
        exclude: ["senha"],
    },
});

module.exports = Usuario;
