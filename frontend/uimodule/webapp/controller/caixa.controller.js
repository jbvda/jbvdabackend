sap.ui.define(
    [
        "com/bicheiros/jogoDoBicho/controller/BaseController",
        "com/bicheiros/jogoDoBicho/model/RegistroFinanceiro",
        "sap/m/MessageToast",
        "com/bicheiros/jogoDoBicho/libs/moment",
    ],
    function (Controller, RegistroFinanceiro, MessageToast, momentjs) {
        "use strict";

        return Controller.extend("com.bicheiros.jogoDoBicho.controller.caixa", {
            onInit: function () {
                let that = this;
                that.getRouter()
                    .getRoute("caixa")
                    .attachPatternMatched(this._onPatternMatched, this);
            },
            onSearchPress: function () {
                let dataInicio = this.getView().byId("lblDtInicio").getValue(),
                    dataFim = this.getView().byId("lblDtFim").getValue();

                if (dataInicio === "" || dataFim === "") {
                    MessageToast.show("Preencha todas as datas.");
                    return;
                }

                dataInicio = moment(dataInicio, "DD/MM/YYYY")
                    .endOf("day")
                    .toDate();

                dataFim = moment(dataFim, "DD/MM/YYYY").endOf("day").toDate();

                if (dataInicio >= dataFim) {
                    MessageToast.show(
                        "Data Fim deve ser maior que Data Inicio."
                    );
                    return;
                }

                this.dataInicio = dataInicio;
                this.dataFim = dataFim;
                this._getRegistros();
            },
            _onPatternMatched: function () {
                this.checkLogin(2);
                this.dataInicio = moment()
                    .subtract(7, "days")
                    .startOf("day")
                    .toDate();
                this.dataFim = moment().endOf("day").toDate();
                this._getRegistros();
            },
            _getRegistros: function () {
                let that = this,
                    oRegistroFinanceiro = new RegistroFinanceiro(
                        this.getApiUrl()
                    );

                oRegistroFinanceiro
                    .get(undefined, {
                        scope: "usuario",
                        where: {
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
                    .then(function (RegistrosFinanceiros) {
                        that.getModel().setProperty(
                            "/registrosfinanceiros",
                            RegistrosFinanceiros.rows
                        );
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        });
    }
);
