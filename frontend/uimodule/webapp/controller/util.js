sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
    "use strict";

    return {
        sleep: function (ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
    };
});
