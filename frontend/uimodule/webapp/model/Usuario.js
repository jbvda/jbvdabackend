sap.ui.define(
    ["com/bicheiros/jogoDoBicho/model/BaseModel"],
    function (BaseModel) {
        "use strict";

        return BaseModel.extend("com.bicheiros.jogoDoBicho.model.Usuario", {
            constructor: function (sUrl) {
                BaseModel.call(this, sUrl, "usuarios");
            },

            onInit: function () {},
        });
    }
);
