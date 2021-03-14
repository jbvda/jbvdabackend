sap.ui.define(
    ["com/bicheiros/jogoDoBicho/model/BaseModel"],
    function (BaseModel) {
        "use strict";

        return BaseModel.extend(
            "com.bicheiros.jogoDoBicho.model.RegistroFinanceiro",
            {
                constructor: function (sUrl) {
                    BaseModel.call(this, sUrl, "registrosfinanceiros");
                },
                onInit: function () {},
            }
        );
    }
);
