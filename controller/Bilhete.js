"use strict";

const Bilhete = require("../model/Bilhete"),
  DefaultController = require("./Default");

class BilheteController extends DefaultController {
  constructor() {
    super(Bilhete);
  }
}

module.exports = BilheteController;
