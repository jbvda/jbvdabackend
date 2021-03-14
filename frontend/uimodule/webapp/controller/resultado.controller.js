sap.ui.define(
    [
        "com/bicheiros/jogoDoBicho/controller/BaseController",
        "com/bicheiros/jogoDoBicho/model/Aposta",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
        "com/bicheiros/jogoDoBicho/libs/moment",
    ],
    function (Controller, Aposta, MessageBox, MessageToast, momentjs) {
        "use strict";

        return Controller.extend(
            "com.bicheiros.jogoDoBicho.controller.resultado",
            {
                onInit: function () {
                    let that = this;
                    that.getRouter()
                        .getRoute("resultado")
                        .attachPatternMatched(this._onPatternMatched, this);
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
                    this._getApostas();
                },
                onRetirarPress: function (oEvent) {
                    let that = this,
                        id = oEvent.getSource().getBindingContext().getObject()
                            .id,
                        oAuth = this.getModel().getProperty("/auth");

                    MessageBox.confirm("Deseja resgatar o prêmio?", {
                        title: "Resgatar Prêmio",
                        actions: ["Sim", "Cancelar"],
                        onClose: async function (sActionClicked) {
                            if (sActionClicked !== "Sim") return;
                        },
                    });
                },
                _onPatternMatched: function () {
                    this.dataInicio = moment()
                        .subtract(7, "days")
                        .startOf("day")
                        .toDate();
                    this.dataFim = moment().endOf("day").toDate();
                    this._getApostas();
                },
                _getApostas: function () {
                    let that = this,
                        oAposta = new Aposta(this.getApiUrl());

                    oAposta
                        .get(undefined, {
                            scope: "animal-multiplicador",
                            where: {
                                ganhou: true,
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
                            },
                            order: ["createdAt", "DESC"],
                        })
                        .then(function (apostas) {
                            apostas = apostas.rows;

                            for (let i = 0; i < apostas.length; i++) {
                                apostas[i].premio =
                                    apostas[i].valor *
                                    apostas[i].multiplicador.valor;
                            }
                            that.getModel().setProperty("/apostas", apostas);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
            }
        );
    }
);
