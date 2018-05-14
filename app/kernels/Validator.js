'use strict';

const ExpressValidator = require(`express-validator`);

class Validator {

  static async apply(server) {
    server.use(ExpressValidator());
  }
}

module.exports= Validator;
