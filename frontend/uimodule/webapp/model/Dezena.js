sap.ui.define(
    ["com/bicheiros/jogoDoBicho/model/BaseModel"],
    function (BaseModel) {
        "use strict";

        return BaseModel.extend("com.bicheiros.jogoDoBicho.model.Dezena", {
            constructor: function (sUrl) {
                BaseModel.call(this, sUrl, "dezenas");
            },

            onInit: function () {},
        });
    }
);
