sap.ui.define(
    [
        "com/bicheiros/jogoDoBicho/controller/BaseController",
        "com/bicheiros/jogoDoBicho/model/Jogo",
        "com/bicheiros/jogoDoBicho/model/Multiplicador",
        "com/bicheiros/jogoDoBicho/model/Bilhete",
        "com/bicheiros/jogoDoBicho/model/Aposta",
        "com/bicheiros/jogoDoBicho/model/Animal",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/m/MessageToast",
    ],
    function (
        Controller,
        Jogo,
        Multiplicador,
        Bilhete,
        Aposta,
        Animal,
        Filter,
        FilterOperator,
        MessageToast
    ) {
        "use strict";

        return Controller.extend("com.bicheiros.jogoDoBicho.controller.venda", {
            onInit: async function () {
                let that = this;
                that.getRouter()
                    .getRoute("venda")
                    .attachMatched(function () {
                        that._clearApostas();
                        let oModel = that.getModel(),
                            oJogo = new Jogo(that.getApiUrl()),
                            oAnimal = new Animal(that.getApiUrl()),
                            oMultiplicador = new Multiplicador(
                                that.getApiUrl()
                            );
                        oJogo.get().then(function (jogos) {
                            oModel.setProperty("/jogos", jogos.rows);
                        });
                        oAnimal.get().then(function (animais) {
                            oModel.setProperty("/animais", animais.rows);
                        });
                        oMultiplicador.get().then(function (multiplicadores) {
                            oModel.setProperty(
                                "/multiplicadores",
                                multiplicadores.rows
                            );
                        });
                    });
            },
            onJogoSelectionChange: function (oEvent) {
                let selectedKey = oEvent.getSource().getSelectedKey(),
                    filter = new Filter({
                        path: "id_jogo",
                        operator: FilterOperator.EQ,
                        value1: parseInt(selectedKey),
                    }),
                    comboBoxMultiplicadores = this.getView().byId(
                        "comboBoxMultiplicadores"
                    ),
                    comboBoxAnimais = this.getView().byId("comboBoxAnimais"),
                    lblAnimais = this.getView().byId("lblAnimais"),
                    iptPalpite = this.getView().byId("iptPalpite"),
                    lblPalpite = this.getView().byId("lblPalpite");

                comboBoxMultiplicadores.setSelectedKey(null);
                comboBoxMultiplicadores.getBinding("items").filter([filter]);
                comboBoxMultiplicadores.setEditable(true);

                if (selectedKey == 1) {
                    comboBoxAnimais.setVisible(true);
                    lblAnimais.setVisible(true);
                    iptPalpite.setVisible(false);
                    lblPalpite.setVisible(false);
                    iptPalpite.setValue(null);
                } else {
                    comboBoxAnimais.setVisible(false);
                    lblAnimais.setVisible(false);
                    iptPalpite.setVisible(true);
                    lblPalpite.setVisible(true);
                    comboBoxAnimais.setSelectedKey(99);
                }
            },
            onAddButtonPress: function () {
                let that = this,
                    oView = that.getView(),
                    jogo = oView.byId("comboBoxJogos").getSelectedItemId()
                        ? oView
                              .byId(
                                  oView
                                      .byId("comboBoxJogos")
                                      .getSelectedItemId()
                              )
                              .getText()
                        : "",
                    multiplicador = oView
                        .byId("comboBoxMultiplicadores")
                        .getSelectedItemId()
                        ? oView
                              .byId(
                                  oView
                                      .byId("comboBoxMultiplicadores")
                                      .getSelectedItemId()
                              )
                              .getText()
                        : "",
                    animal = oView.byId("comboBoxAnimais").getSelectedItemId()
                        ? oView
                              .byId(
                                  oView
                                      .byId("comboBoxAnimais")
                                      .getSelectedItemId()
                              )
                              .getText()
                        : "",
                    idAnimal = oView.byId("comboBoxAnimais").getSelectedKey(),
                    idMultiplicador = oView
                        .byId("comboBoxMultiplicadores")
                        .getSelectedKey(),
                    palpite = oView.byId("iptPalpite").getValue(),
                    valor = oView.byId("iptValor").getValue(),
                    aposta = {
                        indexTemp: that.apostas.length,
                        jogo: jogo,
                        multiplicador: multiplicador,
                        animal: animal,
                        id_bilhete: 0,
                        id_animal: parseInt(idAnimal),
                        id_multiplicador: parseInt(idMultiplicador),
                        palpite: parseInt(palpite),
                        valor: parseFloat(valor).toFixed(2),
                    };
                if (
                    idMultiplicador == "" ||
                    valor == "" ||
                    (palpite == "" && parseInt(idAnimal) == 99)
                ) {
                    MessageToast.show("Preencha todos os campos.");
                    return;
                }
                if (parseInt(valor) <= 0) {
                    MessageToast.show(
                        "Valor da aposta deve ser maior que 1 real."
                    );
                    return;
                }
                that.apostas.push(aposta);
                this._updateBilhete();
                oView.byId("iptPalpite").setValue(null);
                oView.byId("iptValor").setValue(null);
            },
            onConfirmPress: async function () {
                let oModel = this.getView().getModel(),
                    userId = oModel.getProperty("/usuario/id"),
                    oBilhete = new Bilhete(this.getApiUrl()),
                    oAposta = new Aposta(this.getApiUrl()),
                    oAuth = oModel.getProperty("/auth");

                if (this.apostas.length === 0) {
                    MessageToast.show("Faça pelo menos uma aposta.");
                    return;
                }
                let bilhete = await oBilhete.post(
                    { id_usuario: userId },
                    oAuth
                );
                for (let aposta of this.apostas) {
                    aposta.id_bilhete = parseInt(bilhete.id);
                    aposta = await oAposta.post(aposta, oAuth);
                }
                this.getRouter().navTo("bilhete", {
                    id: bilhete.id,
                });
            },
            onCancelPress: function () {
                this._clearApostas();
                this.onNavBack();
            },
            getAnimal: async function (id) {
                let oAnimal = new Animal(this.getApiUrl()),
                    animal = await oAnimal.get(id);
                return animal.rows[0].nome;
            },
            onDeleteAposta: function (oEvent) {
                let indexTemp = oEvent
                        .getParameter("listItem")
                        .getBindingContext()
                        .getObject().indexTemp,
                    apostasAux = [];

                for (let aposta of this.apostas) {
                    if (aposta.indexTemp !== indexTemp) apostasAux.push(aposta);
                }

                for (let i = 0; i < apostasAux.length; i++) {
                    apostasAux[i].indexTemp = i;
                }

                this.apostas = apostasAux;

                this._updateBilhete();
            },
            _updateBilhete: function () {
                this.getView()
                    .getModel()
                    .setProperty("/apostasbilhete", this.apostas);
            },
            _clearApostas: function () {
                this.apostas = [];
                this._updateBilhete();
            },
        });
    }
);
