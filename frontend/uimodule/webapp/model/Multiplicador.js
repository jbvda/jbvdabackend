sap.ui.define(
    ["com/bicheiros/jogoDoBicho/model/BaseModel"],
    function (BaseModel) {
        "use strict";

        return BaseModel.extend(
            "com.bicheiros.jogoDoBicho.model.Multiplicador",
            {
                constructor: function (sUrl) {
                    BaseModel.call(this, sUrl, "multiplicadores");
                },

                onInit: function () {},
            }
        );
    }
);
