sap.ui.define(
    ["com/bicheiros/jogoDoBicho/model/BaseModel"],
    function (BaseModel) {
        "use strict";

        return BaseModel.extend("com.bicheiros.jogoDoBicho.model.Aposta", {
            constructor: function (sUrl) {
                BaseModel.call(this, sUrl, "apostas");
            },

            onInit: function () {},
        });
    }
);
