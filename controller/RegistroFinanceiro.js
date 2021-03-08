"use strict";

const RegistroFinanceiro = require("../model/RegistroFinanceiro"),
    DefaultController = require("./Default");

class RegistroFinanceiroController extends DefaultController {
    constructor() {
        super(RegistroFinanceiro);
    }
}

module.exports = RegistroFinanceiroController;
