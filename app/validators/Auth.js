'use strict';

const { checkSchema } = require('express-validator/check');

class Auth {
  static authenticate(req, res, next) {
    try {
      let validation= {
          app_name: {
            in : ['body'],
            errorMessage: 'app_name is not valid',
            isInt: true
          }
        // , app_secret: {
        //     isInt: true
        //   }
      }
      checkSchema(validation);
    }
    catch (e) {
      throw {
        status: 422,
        message: 'Invalid Data'
      }
    }
    finally {
      next()
    }
  }
}

module.exports= Auth;
