"use strict";

const Usuario = require("../model/Usuario"),
    DefaultController = require("./Default"),
    { request, response } = require("express");

class UsuarioController extends DefaultController {
    constructor() {
        super(Usuario);

        /**
         *
         * @param {typeof request} req Requisição do Usuario
         * @param {typeof response} res Resposta do Servidor
         */
        this.login = async (req, res) => {
            let body = req.body,
                usuario = await Usuario.scope("login").findOne({
                    where: {
                        login: body.login,
                    },
                });
            if (usuario) {
                if (await usuario.senhaValida(body.senha)) {
                    req.session.user = JSON.parse(
                        JSON.stringify(
                            await Usuario.findOne({
                                where: {
                                    login: body.login,
                                },
                            })
                        )
                    );
                    res.status(200).send(req.session.user);
                    return;
                }
            }
            res.status(400).end();
        };

        /**
         *
         * @param {typeof request} req Requisição do Usuario
         * @param {typeof response} res Resposta do Servidor
         */
        this.checkLogin = async (req, res) => {
            res.status(200).send(req.session.user);
        };
    }
}

module.exports = UsuarioController;
