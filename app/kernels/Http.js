'use strict';

const bodyParser = require('body-parser');

const Formatter = require(`${process.env.PWD}/app/helpers/Formatter`)

class Http {
  static async apply(server) {
    try {
      server.on('uncaughtException', (req, rest, next) =>{
        res.status(500).send("Internal Server Error");
      })
      server.use(bodyParser.json());
      server.use(bodyParser.urlencoded({ extended:false }));
    } catch (e) {
      console.log(e);
    }
  }

  static async errorHandler(req, res, route, err) {
    const response = Formatter.toSingleResponse({ reqBody: req.params }, 'Error occured', err.status || err.message || err.description || 'Internal Server Error')

    res.send(err.code || 500, response);
  }
}

module.exports = Http;
