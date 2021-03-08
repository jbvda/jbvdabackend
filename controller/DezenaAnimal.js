"use strict";

const DezenaAnimal = require("../model/DezenaAnimal"),
  DefaultController = require("./Default");

class DezenaAnimalController extends DefaultController {
  constructor() {
    super(DezenaAnimal);
  }
}

module.exports = DezenaAnimalController;
