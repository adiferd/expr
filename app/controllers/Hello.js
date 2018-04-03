'use strict';
const Formatter = require(`${process.env.PWD}/app/helpers/Formatter`);

class Hello {
  static async sayHello(req, res, next) {
    let response = Formatter.toSingleResponse({hello: 'world'}, 'Say hello')
    res.send(response)
    next()
  }
}

module.exports = Hello;
