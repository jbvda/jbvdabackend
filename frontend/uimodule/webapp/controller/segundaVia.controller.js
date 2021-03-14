sap.ui.define(
    [
        "com/bicheiros/jogoDoBicho/controller/BaseController",
        "sap/m/MessageToast",
    ],
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend(
            "com.bicheiros.jogoDoBicho.controller.segundaVia",
            {
                onSearchPress: function () {
                    let idBilhete = this.getView().byId("iptId").getValue();
                    if (idBilhete) {
                        this.getRouter().navTo("bilhete", {
                            id: idBilhete,
                        });
                    } else {
                        MessageToast.show("Informe o ID do bilhete.");
                    }
                },
            }
        );
    }
);
