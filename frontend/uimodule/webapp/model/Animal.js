sap.ui.define(
    ["com/bicheiros/jogoDoBicho/model/BaseModel"],
    function (BaseModel) {
        "use strict";

        return BaseModel.extend("com.bicheiros.jogoDoBicho.model.Animal", {
            constructor: function (sUrl) {
                BaseModel.call(this, sUrl, "animais");
            },

            onInit: function () {},
        });
    }
);
