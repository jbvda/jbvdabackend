"use strict";

const { DataTypes, Model } = require("sequelize"),
    sequelize = require("./sequelize"),
    Bilhete = require("./Bilhete"),
    Animal = require("./Animal"),
    Usuario = require("./Usuario"),
    Multiplicador = require("./Multiplicador");

const Aposta = sequelize.define(
    "apostas",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_bilhete: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Bilhete,
                key: "id",
            },
        },
        id_multiplicador: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Multiplicador,
                key: "id",
            },
        },
        id_animal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 99,
        },
        palpite: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        ganhou: {
            type: DataTypes.BOOLEAN,
            defaultValue: null,
        },
        retirou: {
            type: DataTypes.BOOLEAN,
            defaultValue: null,
        },
    },
    {
        freezeTableName: true,
    }
);

Aposta.getAuthCheck = function () {
    return true;
};

Aposta.postAuthCheck = async function (auth) {
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

Aposta.patchAuthCheck = async function (auth) {
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

Aposta.deleteAuthCheck = async function (auth) {
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

Bilhete.hasMany(Aposta, {
    foreignKey: "id_bilhete",
    as: "apostas",
});
Aposta.belongsTo(Bilhete, {
    foreignKey: "id_bilhete",
    as: "bilhete",
});

Multiplicador.hasMany(Aposta, {
    foreignKey: "id_multiplicador",
    as: "apostas",
});
Aposta.belongsTo(Multiplicador, {
    foreignKey: "id_multiplicador",
    as: "multiplicador",
});

Animal.hasMany(Aposta, {
    foreignKey: "id_animal",
    as: "apostas",
});
Aposta.belongsTo(Animal, {
    foreignKey: "id_animal",
    as: "animal",
});

Aposta.addScope("bilhete", {
    include: "bilhete",
});
Aposta.addScope("multiplicador", {
    include: "multiplicador",
});
Aposta.addScope("animal", {
    include: ["aninimal"],
});

Aposta.addScope("bilhete-multiplicador", {
    include: ["bilhete", "multiplicador"],
});

Aposta.addScope("animal-multiplicador", {
    include: ["animal", "multiplicador"],
});

Aposta.addScope("animal-bilhete-multiplicador", {
    include: ["animal", "bilhete", "multiplicador"],
});

module.exports = Aposta;
