"use strict";

const Animal = require("../model/Animal"),
  DefaultController = require("./Default");

class AnimalController extends DefaultController {
  constructor() {
    super(Animal);
  }
}

module.exports = AnimalController;
