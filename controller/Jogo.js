"use strict";

const Jogo = require("../model/Jogo"),
  DefaultController = require("./Default");

class JogoController extends DefaultController {
  constructor() {
    super(Jogo);
  }
}

module.exports = JogoController;
