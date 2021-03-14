sap.ui.define(
    [
        "com/bicheiros/jogoDoBicho/controller/BaseController",
        "com/bicheiros/jogoDoBicho/model/Bilhete",
        "com/bicheiros/jogoDoBicho/model/Multiplicador",
        "com/bicheiros/jogoDoBicho/model/Animal",
        "com/bicheiros/jogoDoBicho/controller/util",
        "sap/m/MessageToast",
    ],
    function (Controller, Bilhete, Multiplicador, Animal, util, MessageToast) {
        "use strict";

        return Controller.extend(
            "com.bicheiros.jogoDoBicho.controller.bilhete",
            {
                onInit: function () {
                    let that = this;
                    that.getRouter()
                        .getRoute("bilhete")
                        .attachPatternMatched(this._onPatternMatched, this);
                },
                onImprimirPress: function () {},
                _onPatternMatched: async function (oEvent) {
                    let that = this,
                        oModel = that.getModel(),
                        oBilhete = new Bilhete(that.getApiUrl()),
                        oMultiplicador = new Multiplicador(that.getApiUrl()),
                        oAnimal = new Animal(that.getApiUrl());
                    that.idBilhete = oEvent.getParameter("arguments").id;
                    oBilhete
                        .get(that.idBilhete, {
                            scope: "apostas,usuario",
                        })
                        .then(async function (bilhete) {
                            let apostas = [];
                            for (let aposta of bilhete.apostas) {
                                aposta.animal = await oAnimal.get(
                                    aposta.id_animal
                                );
                                aposta.multiplicador = await oMultiplicador.get(
                                    aposta.id_multiplicador,
                                    { scope: "jogo" }
                                );
                                apostas.push(aposta);
                            }
                            bilhete.apostas = apostas;
                            oModel.setProperty("/bilheteselecionado", bilhete);
                        })
                        .catch(async function (error) {
                            oModel.setProperty("/bilheteselecionado", {});
                            MessageToast.show("Bilhete não existe");
                            await util.sleep(3000);
                            that.onNavBack();
                        });
                },
            }
        );
    }
);
