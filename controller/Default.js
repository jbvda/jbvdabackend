"use strict";

const util = require("../model/util"),
    { Model } = require("sequelize"),
    { request, response } = require("express");

class DefaultController {
    /**
     *
     * @param { typeof Model } model
     */
    constructor(model) {
        /**
         *
         * @param {typeof request} req Requisição do Usuario
         * @param {typeof response} res Resposta do Servidor
         */
        this.get = async (req, res) => {
            try {
                let authorized = await model.getAuthCheck(req.body.auth);
                if (!authorized) {
                    res.status(403).end();
                    return;
                }

                let id = req.params.id,
                    query = req.query || {},
                    where = util.validateQueryFields(model, query),
                    scope = query.scope ? query.scope.split(",") : "defaultScope",
                    order = [];

                if (id) {
                    model
                        .scope(scope)
                        .findByPk(id)
                        .then((data) => {
                            if (!data) {
                                res.status(404).end();
                                return;
                            }
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log(error);
                            console.log(error);
                            res.status(500).end();
                        });
                    return;
                }
                if (query.order) {
                    if (Array.isArray(query.order)) order.push(query.order);
                }
                let registers = {
                    count: 0,
                    rows: [],
                };
                model
                    .scope(scope)
                    .findAll({
                        where: where,
                        limit: query.limit ? parseInt(query.limit) : null,
                        offset: query.offset ? parseInt(query.offset) : null,
                        order: order,
                    })
                    .then((data) => {
                        if (!data) {
                            res.status(404).end();
                            return;
                        }
                        registers.rows = data;

                        return model.count({
                            where: where,
                        });
                    })
                    .then((count) => {
                        registers.count = count;
                        res.status(200).json(registers);
                        return;
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).end();
                    });
            } catch (error) {
                console.log(error);
                console.log(error);
                res.status(500).end();
            }
        };

        /**
         *
         * @param {typeof request} req Requisição do Usuario
         * @param {typeof response} res Resposta do Servidor
         */
        this.post = async (req, res) => {
            try {
                let authorized = await model.postAuthCheck(req.body.auth);
                if (!authorized) {
                    res.status(403).end();
                    return;
                }

                let body = req.body.data;

                model
                    .create(body)
                    .then((data) => {
                        res.status(201).send(data);
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
        this.patch = async (req, res) => {
            try {
                let authorized = await model.patchAuthCheck(req.body.auth);
                if (!authorized) {
                    res.status(403).end();
                    return;
                }

                let id = req.params.id,
                    body = req.body.data;

                model
                    .update(body, {
                        where: {
                            id: id,
                        },
                    })
                    .then((data) => {
                        res.status(200).send(data);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).end();
                    });
            } catch (error) {
                console.log(error);
                console.log(error);
                res.status(500).end();
            }
        };

        /**
         *
         * @param {typeof request} req Requisição do Usuario
         * @param {typeof response} res Resposta do Servidor
         */
        this.delete = async (req, res) => {
            try {
                let authorized = await model.deleteAuthCheck(req.body.auth);
                if (!authorized) {
                    res.status(403).end();
                    return;
                }

                let id = req.params.id;

                model
                    .destroy({
                        where: {
                            id: id,
                        },
                    })
                    .then(() => {
                        res.status(200).end();
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).end();
                    });
            } catch (error) {
                console.log(error);
                console.log(error);
                res.status(500).end();
            }
        };
    }
}

module.exports = DefaultController;
