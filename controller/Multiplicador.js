"use strict";

const Multiplicador = require("../model/Multiplicador"),
  DefaultController = require("./Default");

class MultiplicadorController extends DefaultController {
  constructor() {
    super(Multiplicador);
  }
}

module.exports = MultiplicadorController;
