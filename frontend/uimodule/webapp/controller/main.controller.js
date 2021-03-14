sap.ui.define(
    ["com/bicheiros/jogoDoBicho/controller/BaseController"],
    function (Controller) {
        "use strict";

        return Controller.extend("com.bicheiros.jogoDoBicho.controller.main", {
            onInit: function () {
                let that = this;
                that.getRouter().attachRouteMatched(function () {
                    that.checkLogin();
                });
            },
            onVendaPress: function () {
                this.getRouter().navTo("venda");
            },
            onMinhasVendasPress: function () {
                this.getRouter().navTo("minhasVendas");
            },
            onResultadoPress: function () {
                this.getRouter().navTo("resultado");
            },
            onCadastrarSorteioPress: function () {
                this.getRouter().navTo("cadastrarSorteio");
            },
            // onConfigPress: function () {
            //     this.getRouter().navTo("login");
            // },
            onCaixaPress: function () {
                this.getRouter().navTo("caixa");
            },
            onSegundaViaPress: function () {
                this.getRouter().navTo("segundaVia");
            },
            onUsuariosPress: function () {
                this.getRouter().navTo("criarUsuario");
            },
        });
    }
);
