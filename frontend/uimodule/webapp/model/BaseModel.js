sap.ui.define(
    ["sap/ui/base/Object", "sap/ui/model/json/JSONModel", "sap/m/MessageToast"],
    function (Object, JSONModel, MessageToast) {
        "use strict";

        return Object.extend("com.bicheiros.jogoDoBicho.model.BaseModel", {
            /**
             *  @param {String} sModelName
             */
            constructor: function (sUrl, sModelName) {
                this.sModelName = sModelName;
                this.sUrl = sUrl.concat(sModelName, "/");
                // this.i18n = sap.ui.getCore().getModel("i18n").getResourceBundle();
            },

            /**
             *
             * @param {String} sId
             * @param {Object} oQuery
             */
            get: function (sId, oQuery) {
                let that = this,
                    url = sId ? that.sUrl.concat(sId) : that.sUrl;
                return new Promise(function (fnResolve) {
                    $.ajax({
                        url: url,
                        type: "GET",
                        data: oQuery,
                        crossDomain: true,
                        success: function (data) {
                            fnResolve(data);
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                MessageToast.show(
                                    "Sem permissão para esta função."
                                );
                            } else if (data.status == 500) {
                                MessageToast.show("Erro interno de servidor.");
                            } else {
                                MessageToast.show("Erro não especificado.");
                            }
                            fnResolve(data);
                        },
                    });
                });
            },
            /**
             *
             * @param {Object} oBody
             * @param {Object} oAuth
             *
             */
            post: function (oBody, oAuth) {
                let that = this,
                    url = that.sUrl,
                    body = {
                        data: oBody,
                        auth: oAuth,
                    };

                return new Promise(function (fnResolve) {
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: body,
                        crossDomain: true,
                        success: function (data) {
                            fnResolve(data);
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                MessageToast.show(
                                    "Sem permissão para esta função."
                                );
                            } else if (data.status == 500) {
                                MessageToast.show("Erro interno de servidor.");
                            } else {
                                MessageToast.show("Erro não especificado.");
                            }
                            fnResolve(data);
                        },
                    });
                });
            },
            /**
             *
             * @param {String} sId
             * @param {Object} oBody
             * @param {Object} oAuth
             *
             */
            patch: function (sId, oBody, oAuth) {
                let that = this,
                    url = sId ? that.sUrl.concat(sId) : that.sUrl,
                    body = {
                        data: oBody,
                        auth: oAuth,
                    };
                return new Promise(function (fnResolve) {
                    $.ajax({
                        url: url,
                        type: "PATCH",
                        data: body,
                        crossDomain: true,
                        success: function (data) {
                            fnResolve(data);
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                MessageToast.show(
                                    "Sem permissão para esta função."
                                );
                            } else if (data.status == 500) {
                                MessageToast.show("Erro interno de servidor.");
                            } else {
                                MessageToast.show("Erro não especificado.");
                            }
                            fnResolve(data);
                        },
                    });
                });
            },
            /**
             *
             * @param {String} sId
             * @param {Object} oAuth
             *
             */
            delete: function (sId, oAuth) {
                let that = this,
                    url = sId ? that.sUrl.concat(sId) : that.sUrl,
                    body = {
                        auth: oAuth,
                    };
                return new Promise(function (fnResolve) {
                    $.ajax({
                        url: url,
                        type: "DELETE",
                        data: body,
                        crossDomain: true,
                        success: function (data) {
                            fnResolve(data);
                        },
                        error: function (data) {
                            if (data.status == 403) {
                                MessageToast.show(
                                    "Sem permissão para esta função."
                                );
                            } else if (data.status == 500) {
                                MessageToast.show("Erro interno de servidor.");
                            } else {
                                MessageToast.show("Erro não especificado.");
                            }
                            fnResolve(data);
                        },
                    });
                });
            },
        });
    }
);
