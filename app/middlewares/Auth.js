'use strict';

const Formatter = require(`${process.env.PWD}/app/helpers/Formatter`);
const AuthService = require(`${process.env.PWD}/app/services/AuthService`);

class Auth {
  static async isAuthenticated(req, res, next) {
    try {
      let token = req.headers['x-access-token'];
      if(token == null || token === '') {
        throw {
          status: 401,
          message: 'Request not authenticated'
        }

        const auth = await AuthService.validateToken(token);
        console.log(auth);
        if( !auth.hasOwnProperty('app_id') ){
          throw {
            status: 403,
            message: 'Invalid token'
          }
        }

        req.decoded = auth;
      }
    } catch (e) {
      let response = Formatter.toSingleResponse({}, e.message || 'Error occured',  e);
      res.status(e.status || 500).send(response);
    } finally {
      next();
    }
  }
}

module.exports = Auth;
