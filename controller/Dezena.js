"use strict";

const Dezena = require("../model/Dezena"),
  DefaultController = require("./Default");

class DezenaController extends DefaultController {
  constructor() {
    super(Dezena);
  }
}

module.exports = DezenaController;
