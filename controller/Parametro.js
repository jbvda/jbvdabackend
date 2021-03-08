"use strict";

const Parametro = require("../model/Parametro"),
  DefaultController = require("./Default");

class ParametroController extends DefaultController {
  constructor() {
    super(Parametro);
  }
}

module.exports = ParametroController;
