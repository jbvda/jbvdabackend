sap.ui.define(
    [
        "com/bicheiros/jogoDoBicho/controller/BaseController",
        "com/bicheiros/jogoDoBicho/model/Sorteio",
        "com/bicheiros/jogoDoBicho/model/Dezena",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
        "com/bicheiros/jogoDoBicho/libs/moment",
    ],
    function (Controller, Sorteio, Dezena, MessageBox, MessageToast, momentjs) {
        "use strict";

        return Controller.extend(
            "com.bicheiros.jogoDoBicho.controller.cadastrarSorteio",
            {
                onInit: function () {
                    let that = this;
                    that.getRouter()
                        .getRoute("cadastrarSorteio")
                        .attachPatternMatched(this._onPatternMatched, this);
                },
                onAddButtonPress: async function (oEvent) {
                    let button = oEvent.getSource(),
                        oAuth = this.getModel().getProperty("/auth"),
                        oSorteio = new Sorteio(this.getApiUrl()),
                        oDezena = new Dezena(this.getApiUrl()),
                        oView = this.getView(),
                        sorteio = {},
                        dezenas = [{}, {}, {}, {}, {}],
                        faltaDezena = false;

                    button.setEnabled(false);

                    sorteio.id = oView.byId("iptNumeroSorteio").getValue();
                    sorteio.data_apuracao = oView.byId("iptDate").getValue();

                    for (let i = 0; i < 5; i++) {
                        if (
                            oView.byId("iptDezena".concat(i + 1)).getValue() ===
                                "" ||
                            oView.byId("iptDezena".concat(i + 1)).getValue() ==
                                null
                        )
                            faltaDezena = true;
                    }

                    if (
                        sorteio.id === "" ||
                        sorteio.data_apuracao === "" ||
                        faltaDezena
                    ) {
                        MessageToast.show("Preencha todos os campos.");
                        button.setEnabled(true);
                        return;
                    }

                    sorteio.data_apuracao = moment(
                        sorteio.data_apuracao,
                        "DD/MM/YYYY"
                    )
                        .startOf("day")
                        .toDate();

                    oSorteio
                        .post(sorteio, oAuth)
                        .then(async function (data) {
                            console.log(data);
                            for (let i = 0; i < 5; i++) {
                                dezenas[i].id_sorteio = sorteio.id;
                                dezenas[i].dezena = oView
                                    .byId("iptDezena".concat(i + 1))
                                    .getValue();
                                await oDezena.post(dezenas[i], oAuth);
                            }
                            MessageToast.show(
                                "Sorteio cadastrado com sucesso!"
                            );
                            button.setEnabled(true);
                        })
                        .catch(function (error) {
                            button.setEnabled(true);
                            // if (error.status == 403) {
                            //     MessageToast.show(
                            //         "Sem permissão para esta função."
                            //     );
                            // } else if (error.status == 500) {
                            //     MessageToast.show("Erro interno de servidor.");
                            // } else {
                            //     MessageToast.show("Erro não especificado.");
                            // }
                        });
                },
                onCalcularButtonPress: function () {
                    let url = this.getApiUrl().concat("calcularVencedor"),
                        oAuth = this.getModel().getProperty("/auth"),
                        body = {
                            auth: oAuth,
                        };
                    MessageBox.confirm("Deseja atualizar vencedores?", {
                        title: "Atualizar Vencedores",
                        actions: ["Sim", "Cancelar"],
                        onClose: async function (sActionClicked) {
                            if (sActionClicked !== "Sim") return;
                            $.ajax({
                                url: url,
                                type: "PATCH",
                                data: body,
                                crossDomain: true,
                                success: function (data) {
                                    // console.log(data);
                                },
                                error: function (error) {
                                    if (error.status == 403) {
                                        MessageToast.show(
                                            "Sem permissão para esta função."
                                        );
                                    } else if (error.status == 500) {
                                        MessageToast.show(
                                            "Erro interno de servidor."
                                        );
                                    } else {
                                        MessageToast.show(
                                            "Erro não especificado."
                                        );
                                    }
                                },
                            });
                        },
                    });
                },
                _onPatternMatched: function () {
                    this.checkLogin(2);
                },
            }
        );
    }
);
