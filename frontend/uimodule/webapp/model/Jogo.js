sap.ui.define(
    ["com/bicheiros/jogoDoBicho/model/BaseModel"],
    function (BaseModel) {
        "use strict";

        return BaseModel.extend("com.bicheiros.jogoDoBicho.model.Jogo", {
            constructor: function (sUrl) {
                BaseModel.call(this, sUrl, "jogos");
            },

            onInit: function () {},
        });
    }
);
