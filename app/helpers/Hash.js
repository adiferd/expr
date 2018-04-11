'use strict';

const jwt = require('jsonwebtoken');

class Hash {
    static async jwtSign(signedObject, secret) {
      const promisedJWTSign = new Promise((resolve, reject)=> {
        jwt.sign(signedObject, secret, (err, result)=> {
          if(err){
            return reject(err);
          }
          else{
            resolve(result);
          }
        })
      });

      return promisedJWTSign;
    }

    static async jwtVerify(token, secret) {
      const promisedJWTVerify = new Promise((resolve, reject)=> {
        jwt.verify(token, secret, function(err, decoded) {
          if(err){
            return reject(err);
          }
          else {
            return resolve(decoded);
          }
        });
      });

      return promisedJWTVerify;
    }
}

module.exports = Hash;
