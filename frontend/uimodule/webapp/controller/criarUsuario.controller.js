sap.ui.define(
    [
        "com/bicheiros/jogoDoBicho/controller/BaseController",
        "com/bicheiros/jogoDoBicho/model/Usuario",
        "sap/m/MessageToast",
    ],
    function (Controller, Usuario, MessageToast) {
        "use strict";

        return Controller.extend(
            "com.bicheiros.jogoDoBicho.controller.criarUsuario",
            {
                onAddButtonPress: function () {
                    let that = this,
                        oView = that.getView(),
                        oAuth = that.getModel().getProperty("/auth"),
                        oUsuario = new Usuario(that.getApiUrl()),
                        data = {
                            login: oView.byId("iptLogin").getValue(),
                            senha: oView.byId("iptSenha").getValue(),
                            nome: oView.byId("iptNome").getValue(),
                            nivel_acesso: parseInt(
                                oView
                                    .byId("comboBoxNivelAcesso")
                                    .getSelectedKey()
                            ),
                        };
                    if (
                        data.login == null ||
                        data.login == "" ||
                        data.senha == null ||
                        data.senha == "" ||
                        data.nome == null ||
                        data.nome == "" ||
                        data.nivel_acesso == null ||
                        data.nivel_acesso == ""
                    ) {
                        MessageToast.show("Preencha todos os campos.");
                        return;
                    }

                    oUsuario
                        .post(data, oAuth)
                        .then(async function (data) {
                            MessageToast.show(
                                "Usuário cadastrado com sucesso!"
                            );
                            oView.byId("iptUsuario").setValue(null);
                            oView.byId("iptSenha").setValue(null);
                            oView.byId("iptNome").setValue(null);
                            oView.byId("comboBoxNivelAcesso").setSelectedKey(1);
                        })
                        .catch(function (error) {
                            // MessageToast.show(
                            //     "Err cadastrado com sucesso!"
                            // );
                        });
                },
            }
        );
    }
);
