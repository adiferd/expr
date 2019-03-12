'use strict';

const Formatter = require(`${process.env.PWD}/app/helpers/Formatter`);
const ConfigHelper = require(`${process.env.PWD}/app/helpers/Config`);
const AuthService = require(`${process.env.PWD}/app/services/AuthService`);

class Auth {

  static async doAuthentication(req, res, next) {
    try {
      const auth =  await AuthService.doAuthentication(
                      req.body.app_name,
                      req.body.app_secret
                    );
      let response = Formatter.toSingleResponse(auth, 'Successfully authenticated');
      res.status(200).send(response);
    } catch (e) {
      let response = Formatter.toSingleResponse({error:e}, 'Error occured');
      res.status(400).send(response);
    } finally {
      next()
    }
  }

  static async getAccessToken(req, res, next) {
    try {
        let body = req.body
      if(body.app_id === `${ConfigHelper.get('client').app_id}` && body.app){
        res.status(200).send()
      }
    } catch (e) {

    } finally {
      next()
    }
  }
}

module.exports = Auth;
