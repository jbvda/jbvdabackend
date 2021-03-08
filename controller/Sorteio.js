"use strict";

const Sorteio = require("../model/Sorteio"),
    Aposta = require("../model/Aposta"),
    DefaultController = require("./Default"),
    moment = require("moment"),
    { Op } = require("sequelize"),
    { request, response } = require("express");

class SorteioController extends DefaultController {
    constructor() {
        super(Sorteio);

        /**
         *
         * @param {typeof request} req Requisição do Usuario
         * @param {typeof response} res Resposta do Servidor
         */
        this.calcularVencedor = async (req, res) => {
            try {
                let authorized = await Sorteio.postAuthCheck(req.body.auth);
                if (!authorized) {
                    res.status(403).end();
                    return;
                }
                let sorteio = await Sorteio.scope("dezenas").findOne({
                        order: [["data_apuracao", "DESC"]],
                    }),
                    apostas = await Aposta.scope("animal-multiplicador").findAll({
                        where: {
                            createdAt: {
                                [Op.lt]: sorteio.data_apuracao,
                            },
                            ganhou: null,
                            retirou: null,
                        },
                    }),
                    dezenasSorteadas = [],
                    centenasSorteadas = [];

                for (let dezena of sorteio.dezenas) {
                    let d = dezena.dezena.toString();
                    dezenasSorteadas.push(d.substring(d.length, d.length - 2));
                    centenasSorteadas.push(d.substring(d.length, d.length - 3));
                }
                for (let aposta of apostas) {
                    aposta.ganhou = false;
                    aposta.retirou = false;
                    if (aposta.multiplicador.id_jogo === 1) {
                        if (aposta.multiplicador.numero_acertos === 1) {
                            for (let dezenaAnimal of aposta.animal.dezenas) {
                                if (dezenaAnimal.dezena.toString() === dezenasSorteadas[0]) {
                                    aposta.ganhou = true;
                                }
                            }
                        } else {
                            for (let dezenaAnimal of aposta.animal.dezenas) {
                                for (let dezena of dezenasSorteadas) {
                                    if (dezenaAnimal.dezena.toString() === dezena) {
                                        aposta.ganhou = true;
                                    }
                                }
                            }
                        }
                    } else if (aposta.multiplicador.id_jogo === 2) {
                        if (aposta.multiplicador.numero_acertos === 1) {
                            if (aposta.palpite.toString() === dezenasSorteadas[0]) aposta.ganhou = true;
                        } else {
                            for (let dezena of dezenasSorteadas) {
                                if (aposta.palpite.toString() === dezena) {
                                    aposta.ganhou = true;
                                }
                            }
                        }
                    } else if (aposta.multiplicador.id_jogo === 3) {
                        if (aposta.multiplicador.numero_acertos === 1) {
                            if (aposta.palpite.toString() === centenasSorteadas[0]) aposta.ganhou = true;
                        } else {
                            for (let centena of centenasSorteadas) {
                                if (aposta.palpite.toString() === centena) {
                                    aposta.ganhou = true;
                                }
                            }
                        }
                    }
                    aposta = JSON.parse(JSON.stringify(aposta));
                    await Aposta.update(aposta, {
                        where: {
                            id: aposta.id,
                        },
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(500).end();
            }
        };
    }
}

module.exports = SorteioController;
