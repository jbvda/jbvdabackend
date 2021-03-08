"use strict";

const { DataTypes } = require("sequelize"),
    sequelize = require("./sequelize"),
    Usuario = require("./Usuario"),
    Animal = require("./Animal");

const DezenaAnimal = sequelize.define(
    "dezenas_animais",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_animal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Animal,
                key: "id",
            },
        },
        dezena: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

DezenaAnimal.getAuthCheck = function () {
    return true;
};

DezenaAnimal.postAuthCheck = async function (auth) {
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

DezenaAnimal.patchAuthCheck = async function (auth) {
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

DezenaAnimal.deleteAuthCheck = async function (auth) {
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

Animal.hasMany(DezenaAnimal, {
    foreignKey: "id_animal",
    as: "dezenas",
});

DezenaAnimal.belongsTo(Animal, {
    foreignKey: "id_animal",
    as: "animal",
});

DezenaAnimal.addScope("animal", {
    include: "animal",
});

module.exports = DezenaAnimal;
