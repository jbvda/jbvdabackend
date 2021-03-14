sap.ui.define(["com/bicheiros/jogoDoBicho/libs/moment"], function (momentjs) {
    "use strict";
    return {
        dateTime: function (date) {
            if (date) return moment(date).format("DD/MM/YYYY HH:mm:SS");
            return "";
        },
        date: function (date) {
            if (date) return moment(date).format("DD/MM/YYYY");
            return "";
        },
        valorTotalBilhete: function (apostas) {
            let valorTotal = 0;
            if (!Array.isArray(apostas)) apostas = [];
            for (let aposta of apostas) {
                valorTotal += aposta.valor || 0;
            }
            return valorTotal.toFixed(2);
        },
        dinheiro: function (valor) {
            return parseFloat(valor).toFixed(2);
        },
        dezena: function (dezena) {
            if (dezena < 10) {
                dezena = "0".concat(dezena);
            }
            return dezena;
        },
        centena: function (centena) {
            if (centena < 10) {
                centena = "00".concat(centena);
            } else if (centena < 100) {
                centena = "0".concat(centena);
            }
            return centena;
        },
        entradaOuSaida: function (tipo) {
            if (tipo === "s") return "Warning";
            return "Success";
        },
    };
});
