"use strict";

const Aposta = require("../model/Aposta"),
    Usuario = require("../model/Usuario"),
    RegistroFinanceiro = require("../model/RegistroFinanceiro"),
    DefaultController = require("./Default");

class ApostaController extends DefaultController {
    constructor() {
        super(Aposta);
        /**
         *
         * @param {typeof request} req Requisição do Usuario
         * @param {typeof response} res Resposta do Servidor
         */
        this.post = async (req, res) => {
            try {
                let authorized = await Aposta.postAuthCheck(req.body.auth);
                if (!authorized) {
                    res.status(403).end();
                    return;
                }

                let body = req.body.data;

                Aposta.create(body)
                    .then(async (data) => {
                        try {
                            let usuario = await Usuario.findOne({
                                    where: {
                                        login: req.body.auth.login,
                                    },
                                }),
                                entrada = {
                                    id_usuario: usuario.id,
                                    tipo: "e",
                                    valor: data.valor,
                                };
                            await RegistroFinanceiro.create(entrada);
                            res.status(201).send(data);
                        } catch (e) {
                            console.log(e);
                            await data.destroy();
                            res.status(500).end();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).end();
                    });
            } catch (error) {
                console.log(error);
                res.status(500).end();
            }
        };
        /**
         *
         * @param {typeof request} req Requisição do Usuario
         * @param {typeof response} res Resposta do Servidor
         */
        this.retirar = async (req, res) => {
            let authorized = await Aposta.patchAuthCheck(req.body.auth);
            if (!authorized) {
                res.status(403).end();
                return;
            }
            let id = req.params.id;

            Aposta.findAll({ where: { id: id, ganhou: true, retirou: false } })
                .then(async (data) => {
                    res.send(data);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).end();
                });
        };
    }
}

module.exports = ApostaController;
