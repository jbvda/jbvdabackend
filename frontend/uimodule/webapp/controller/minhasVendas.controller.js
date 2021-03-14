sap.ui.define(
    [
        "com/bicheiros/jogoDoBicho/controller/BaseController",
        "com/bicheiros/jogoDoBicho/model/Bilhete",
        "com/bicheiros/jogoDoBicho/controller/util",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
        "com/bicheiros/jogoDoBicho/libs/moment",
    ],
    function (Controller, Bilhete, util, MessageBox, MessageToast, momentjs) {
        "use strict";

        return Controller.extend(
            "com.bicheiros.jogoDoBicho.controller.minhasVendas",
            {
                onInit: function () {
                    let that = this;
                    that.getRouter()
                        .getRoute("minhasVendas")
                        .attachMatched(function () {
                            that.dataInicio = moment()
                                .subtract(7, "days")
                                .startOf("day")
                                .toDate();
                            that.dataFim = moment().endOf("day").toDate();
                            that._getBilhetes();
                        });
                },

                onBilhetePress: function (oEvent) {
                    let idBilhete = oEvent
                        .getSource()
                        .getBindingContext()
                        .getObject().id;
                    this.getRouter().navTo("bilhete", {
                        id: idBilhete,
                    });
                },
                onBilheteDelete: function (oEvent) {
                    let that = this,
                        id = oEvent
                            .getParameter("listItem")
                            .getBindingContext()
                            .getObject().id,
                        oAuth = this.getModel().getProperty("/auth"),
                        oBilhete = new Bilhete(that.getApiUrl());

                    MessageBox.confirm("Deseja deletar este bilhete?", {
                        title: "Deletar Bilhete",
                        actions: ["Sim", "Cancelar"],
                        onClose: async function (sActionClicked) {
                            if (sActionClicked !== "Sim") return;
                            oBilhete
                                .delete(id, oAuth)
                                .then(function () {
                                    MessageToast.show("Bilhete deletado.");
                                    that._getBilhetes();
                                })
                                .catch(function (error) {
                                    // if (error.status === 403) {
                                    //     MessageToast.show(
                                    //         "Sem autorização para deletar bilhetes."
                                    //     );
                                    // } else {
                                    //     MessageToast.show(
                                    //         "Erro não identificado, tente novamente mais tarde."
                                    //     );
                                    // }
                                });
                        },
                    });
                },
                onSearchPress: function () {
                    let dataInicio = this.getView()
                            .byId("lblDtInicio")
                            .getValue(),
                        dataFim = this.getView().byId("lblDtFim").getValue();

                    if (dataInicio === "" || dataFim === "") {
                        MessageToast.show("Preencha todas as datas.");
                        return;
                    }

                    dataInicio = moment(dataInicio, "DD/MM/YYYY")
                        .endOf("day")
                        .toDate();

                    dataFim = moment(dataFim, "DD/MM/YYYY")
                        .endOf("day")
                        .toDate();

                    if (dataInicio >= dataFim) {
                        MessageToast.show(
                            "Data Fim deve ser maior que Data Inicio."
                        );
                        return;
                    }

                    this.dataInicio = dataInicio;
                    this.dataFim = dataFim;
                    this._getBilhetes();
                },
                _getBilhetes: async function () {
                    let that = this,
                        oModel = that.getModel(),
                        userId = oModel.getProperty("/usuario/id"),
                        oBilhete = new Bilhete(that.getApiUrl()),
                        bilhetes = await oBilhete.get(undefined, {
                            id_usuario: userId,
                            createdAt: JSON.stringify([
                                {
                                    op: "gte",
                                    value: that.dataInicio,
                                },
                                {
                                    op: "lte",
                                    value: that.dataFim,
                                },
                            ]),
                            scope: "apostas",
                            order: ["createdAt", "DESC"],
                        });

                    oModel.setProperty("/bilhetes", bilhetes.rows);
                },
            }
        );
    }
);
