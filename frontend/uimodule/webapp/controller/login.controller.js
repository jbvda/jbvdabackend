sap.ui.define(
    [
        "com/bicheiros/jogoDoBicho/controller/BaseController",
        "sap/m/MessageToast",
    ],
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("com.bicheiros.jogoDoBicho.controller.login", {
            onInit: function () {
                let that = this;
                that.getRouter().getRoute("login").attachMatched(async function () {
                    // let usuario = await that._checkLogin();
                    // if (usuario) {
                    //     oModel.setProperty("/usuario", usuario);
                    //     that.getRouter().navTo("main");
                    // }
                });
            },
            onSubmitPress: async function () {
                let oModel = this.getModel(),
                    data = {
                        login: this.getView().byId("iptUsuario").getValue(),
                        senha: this.getView().byId("iptSenha").getValue(),
                    },
                    usuario = await this._logar(data);
                if (usuario) {
                    oModel.setProperty("/usuario", usuario);
                    oModel.setProperty("/auth", data);

                    this.onNavBack();
                }
            },
            _logar: function (data) {
                let url = this.getApiUrl() + "login";
                return new Promise(function (fnResolve) {
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: data,
                        crossDomain: true,
                        success: function (data) {
                            fnResolve(data);
                        },
                        error: function (e) {
                            MessageToast.show(
                                "Usuário e/ou senha incorreto(s)"
                            );
                            fnResolve(null);
                        },
                    });
                });
            },
            _checkLogin: function () {
                let url = this.getApiUrl() + "checkLogin";
                return new Promise(function (fnResolve) {
                    $.ajax({
                        url: url,
                        type: "GET",
                        crossDomain: true,
                        success: function (data) {
                            fnResolve(data);
                        },
                    });
                });
            },
        });
    }
);
