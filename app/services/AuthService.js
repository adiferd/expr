'use strict';

const ConfigHelper = require(`${process.env.PWD}/app/helpers/Config`);
const Hash = require(`${process.env.PWD}/app/helpers/Hash`);

class AuthService {
  static async doAuthentication(name, secret) {
      if (name === ConfigHelper.get('client').app_name &&
        secret === ConfigHelper.get('client').app_secret) {
          let signedObject = {
            app_name : ConfigHelper.get('client').app_name,
            app_id : ConfigHelper.get('client').app_id,
            app_secret : ConfigHelper.get('client').app_secret
          }

          signedObject = await Hash.jwtSign(signedObject, ConfigHelper.get('client').access_token);
          return {
            appData: {
              appname: name,
              appsecret: secret
            },
            token: signedObject
          };
      }
      else {
        throw {
				        message: 'Invalid Credential',
				        status: 400
			        }
      }
  }

  static async validateToken(token) {
      try {
          const decrypted = await Hash.jwtVerify(token, ConfigHelpe.get('client').access_token);
          return decrypted;
      } catch (e) {
        console.log(e);
        return false;
      }
  }
}

module.exports = AuthService;
