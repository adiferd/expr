'use strict'

const Config = require(`${process.env.PWD}/app/helpers/Config`);
const Sequilize = require('sequilize')

class Database {
  static init() {
    try {
      const DBConfig = Config.get('database')

      return new Sequilize(
                        DBConfig.database
                      , DBConfig.username
                      , DBConfig.password
                      , DBConfig.setting
                    );
    } catch (e) {
      console.log(e);
      return e;
  }
}

module.exports = Database;
